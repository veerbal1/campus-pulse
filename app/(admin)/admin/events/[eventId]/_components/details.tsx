function Details({
  details: { name, description, event_date, location },
}: any) {
  return (
    <div className="p-4 w-full">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {name}
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">{description}</p>
      <br />
      <small className="text-sm font-medium leading-none">
        {event_date}
        <br />
        {location}
      </small>
    </div>
  );
}

export default Details;
