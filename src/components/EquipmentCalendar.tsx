'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'

interface EquipmentCalendarProps {
  equipmentId: string
  onDateSelect?: (startDate: Date, endDate: Date) => void
}

export default function EquipmentCalendar({ equipmentId, onDateSelect }: EquipmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month')

  // Fetch rental requests for this equipment
  const rentalRequests = useQuery(api.equipment.getRentalRequestsByEquipment, { equipmentId: equipmentId as Id<"equipment"> }) || []

  // Get all booked dates for this equipment
  const getBookedDates = () => {
    const bookedDates: Set<string> = new Set()

    rentalRequests.forEach(request => {
      if (request.status === 'approved') {
        const startDate = new Date(request.startDate)
        const endDate = new Date(request.endDate)

        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
          bookedDates.add(date.toDateString())
        }
      }
    })

    return bookedDates
  }

  const bookedDates = getBookedDates()

  const isDateBooked = (date: Date) => {
    return bookedDates.has(date.toDateString())
  }

  const isDateInPast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isDateSelected = (date: Date) => {
    if (!selectedStartDate && !selectedEndDate) return false
    if (selectedStartDate && !selectedEndDate) {
      return date.toDateString() === selectedStartDate.toDateString()
    }
    if (selectedStartDate && selectedEndDate) {
      return date >= selectedStartDate && date <= selectedEndDate
    }
    return false
  }

  const handleDateClick = (date: Date) => {
    if (isDateInPast(date) || isDateBooked(date)) return

    if (!selectedStartDate) {
      setSelectedStartDate(date)
    } else if (!selectedEndDate) {
      if (date >= selectedStartDate) {
        setSelectedEndDate(date)
        onDateSelect?.(selectedStartDate, date)
      } else {
        // If clicked date is before start date, reset and set as start date
        setSelectedStartDate(date)
        setSelectedEndDate(null)
      }
    } else {
      // Reset selection
      setSelectedStartDate(date)
      setSelectedEndDate(null)
    }
  }

  const clearSelection = () => {
    setSelectedStartDate(null)
    setSelectedEndDate(null)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const monthDays = getDaysInMonth(currentDate)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Equipment Availability
            </CardTitle>
            <CardDescription>
              Select your rental dates. Green dates are available, red dates are booked.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day headers */}
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {monthDays.map((date, index) => (
            <div key={index} className="aspect-square">
              {date ? (
                <button
                  onClick={() => handleDateClick(date)}
                  disabled={isDateInPast(date) || isDateBooked(date)}
                  className={`
                    w-full h-full p-2 text-sm rounded-lg transition-colors relative
                    ${isDateInPast(date)
                      ? 'text-gray-400 cursor-not-allowed'
                      : isDateBooked(date)
                        ? 'bg-red-100 text-red-800 cursor-not-allowed'
                        : isDateSelected(date)
                          ? selectedStartDate && selectedEndDate
                            ? 'bg-blue-200 text-blue-900'
                            : 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100 text-gray-900'
                    }
                  `}
                >
                  {date.getDate()}

                  {/* Status indicators */}
                  {isDateBooked(date) && (
                    <div className="absolute top-1 right-1">
                      <XCircle className="h-2 w-2 text-red-600" />
                    </div>
                  )}

                  {isDateSelected(date) && selectedStartDate && !selectedEndDate && (
                    <div className="absolute top-1 right-1">
                      <CheckCircle className="h-2 w-2 text-white" />
                    </div>
                  )}
                </button>
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Selection Summary */}
        {(selectedStartDate || selectedEndDate) && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Selected dates:</span>
                </div>
                {selectedStartDate && (
                  <Badge variant="secondary">
                    {selectedStartDate.toLocaleDateString()}
                  </Badge>
                )}
                {selectedEndDate && (
                  <>
                    <span className="text-gray-600">to</span>
                    <Badge variant="secondary">
                      {selectedEndDate.toLocaleDateString()}
                    </Badge>
                  </>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={clearSelection}>
                Clear Selection
              </Button>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="border-t pt-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span>Past dates</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
