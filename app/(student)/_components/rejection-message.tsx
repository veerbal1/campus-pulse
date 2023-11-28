function RejectionMessage({ userName }: { userName: string }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4 antialiased">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        Notification from CampusPulse
      </h1>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-secondary-foreground">
        Dear <strong>{userName}</strong>
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        We appreciate your interest in joining CampusPulse. After careful
        consideration, we regret to inform you that we are unable to approve
        your account registration at this time.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        This decision may be based on a variety of factors related to our
        community guidelines, user policies, or the information provided in your
        registration.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Please consider the following:
      </p>
      <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">
        <li>
          <strong>Review Our Policies:</strong> We encourage you to review our
          community guidelines and registration policies available on our
          CampusPulse. This may provide clarity on our decision.
        </li>
        <li>
          <strong>Update Information:</strong> If you believe there has been a
          misunderstanding or if you can provide additional information that
          might change our decision, please feel free to update your
          registration details and reapply.
        </li>
        <li>
          <strong>Need Help?:</strong> If you have any questions or need
          assistance, our support team is here for you. Contact us at
          <strong>
            &nbsp;
            <a href="mailto:veerbalsingh1@gmail.com">veerbalsingh1@gmail.com</a>
            &nbsp;
          </strong>
          anytime.
        </li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        We understand this may be disappointing and appreciate your
        understanding. Our decisions are aimed at maintaining the safety,
        integrity, and quality of our platform.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Thank you for your interest in CampusPulse.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">Best regards,</p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The CampusPulse Team
      </p>
    </div>
  );
}

export default RejectionMessage;
