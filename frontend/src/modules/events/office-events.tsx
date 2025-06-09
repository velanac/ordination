function OfficeEvents() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>Office Events</h2>
      <p className='text-gray-600'>
        Stay updated with the latest events happening in the office.
      </p>
      <ul className='list-disc pl-5'>
        <li>Weekly team meetings every Monday at 10 AM</li>
        <li>Monthly all-hands meeting on the first Friday of each month</li>
        <li>Quarterly team-building activities</li>
      </ul>
    </div>
  );
}

export { OfficeEvents };
