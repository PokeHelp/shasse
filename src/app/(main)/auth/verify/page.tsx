import {PageLayout} from "@components";

export default async function AccountVerifyPage(props: {searchParams: Promise<Record<string, string>>})
{
    const searchParams = await props.searchParams;
    const email = searchParams.email;

    return (
      <PageLayout>
        <h1>Important: Checkez votre email</h1>
          {
              email ? (
                  <p>On à envoyé un email à {email}</p>
              ) : null
          }
      </PageLayout>
    );
}