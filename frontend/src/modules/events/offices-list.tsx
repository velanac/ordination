function OfficeList() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>Offices</h2>
      <p className='text-gray-600'>
        Here you can find a list of all the offices.
      </p>
      <ul className='list-disc pl-5'>
        <li>Office 1</li>
        <li>Office 2</li>
        <li>Office 3</li>
      </ul>
    </div>
  );
}

export { OfficeList };
