function WelcomeMessage({ userName }: { userName: string }) {
  userName ? userName : 'Guest';
  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4 antialiased">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        Welcome to CampusPulse!
      </h1>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-secondary-foreground">
        Dear <strong>{userName}</strong>
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Thank you for registering with us! Your account is currently under
        review. We're excited to have you join our community and are working
        diligently to approve your registration as quickly as possible.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        In the meantime, here's what you can expect:
      </p>
      <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">
        <li>
          <strong>Account Review:</strong> Our team is currently reviewing your
          registration details. This process typically takes 1-2 days, but we
          strive to be faster whenever possible.
        </li>
        <li>
          <strong>Access to Features:</strong> Once your account is approved,
          you will have full access to all the features and services we offer.
        </li>
        <li>
          <strong>Stay Updated:</strong>You can also check your registration
          status by logging into our CampusPulse.
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
        We appreciate your patience and are thrilled to welcome you to our
        platform. Get ready to embark on an exciting journey with us!
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">Warm regards,</p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The CampusPulse Team
      </p>
    </div>
  );
}

export default WelcomeMessage;
