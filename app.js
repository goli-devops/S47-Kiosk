setInterval(() => {
  let date = new Date()

  // Options for formatting the date and time
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }

  // Format the date and time according to the options
  let newDate = date.toLocaleString("en-US", options)
  document.getElementById("date-el").textContent = newDate

  // Determine rate logic
  const currentDay = date.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentHour = date.getHours() // 0-23

  // Get the elements for rates
  let weekdayRateElement = document.getElementById("weekday")
  let weekendRateElement = document.getElementById("weekend")
  let holidayRateElement = document.getElementById("holiday") // <--- ADD THIS IN HTML
  let onp = document.getElementById("onp")
  let regularTen = document.getElementById("regular-ten")

  // ---- HOLIDAY LIST ----
  const holidayDates = [
    "2025-06-06", // Eid’l Adha (estimated)
    "2025-06-12", // Independence Day
    "2025-08-21", // Ninoy Aquino Day
    "2025-08-25", // National Heroes Day
    "2025-11-01", // All Saints' Day
    "2025-11-30", // Bonifacio Day
    "2025-12-08", // Feast of the Immaculate Conception
    "2025-12-24", // Christmas Eve
    "2025-12-25", // Christmas Day
    "2025-12-30", // Rizal Day
    "2025-12-31", // New Year's Eve
  ]

  function isHolidayNow() {
    for (let dateStr of holidayDates) {
      // Holiday starts at 12:00 AM of the date
      const holidayStart = new Date(`${dateStr}T00:00:00`)

      // Holiday ends at 11:59:59 PM of the same day
      const holidayEnd = new Date(`${dateStr}T23:59:59`)

      if (date >= holidayStart && date <= holidayEnd) {
        return true
      }
    }
    return false
  }

  // ---- RATE DISPLAY LOGIC ----
  if (isHolidayNow()) {
    // HOLIDAY RATE
    holidayRateElement.style.display = "block"
    weekdayRateElement.style.display = "none"
    weekendRateElement.style.display = "none"
  } else if (
    // WEEKEND: Friday 6:00am to Sunday 5:59pm
    (currentDay === 5 && currentHour >= 6) || // Friday from 6:00am onwards
    currentDay === 6 || // Saturday all day
    (currentDay === 1 && currentHour < 00) // Sunday before 6:00pm
  ) {
    // WEEKEND RATE
    weekendRateElement.style.display = "block"
    weekdayRateElement.style.display = "none"
    holidayRateElement.style.display = "none"
  } else {
    // WEEKDAY RATE
    weekdayRateElement.style.display = "block"
    weekendRateElement.style.display = "none"
    holidayRateElement.style.display = "none"
  }

  // ---- ONP (Overnight Promo) ----
  if (
    (currentDay === 0 && currentHour >= 20) || // Sunday 8pm onwards
    (currentDay >= 1 && currentDay <= 4 && currentHour >= 20) || // Mon-Thu 8pm onwards
    (currentDay >= 1 && currentDay <= 5 && currentHour < 6) // Mon-Fri until 5:59am
  ) {
    regularTen.style.display = "none"
    onp.style.display = "table-row"
  } else {
    onp.style.display = "none"
    regularTen.style.display = "table-row"
  }
}, 1000) // Update every second

// ZOOM WEBPAGE IF CLICK ANYWHERE
document.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Error: ${err.message}`)
    })
  }
})



