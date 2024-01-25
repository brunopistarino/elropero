import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setCookie } from "@/lib/actions";
import { cookies } from "next/headers";

export default function Page() {
  const cookieStore = cookies();
  // return cookieStore.getAll().map((cookie) => (
  //   <>
  //     <div key={cookie.name}>
  //       <p>Name: {cookie.name}</p>
  //       <p>Value: {cookie.value}</p>
  //     </div>
  //     <form action={setCookie}>
  //       <button>Submit</button>
  //     </form>
  //   </>
  // ));
  return (
    <>
      {cookieStore.getAll().map((cookie) => (
        <div key={cookie.name} className="bg-background p-4 rounded">
          <p>Name: {cookie.name}</p>
          <p>Value: {cookie.value}</p>
        </div>
      ))}
      <form action={setCookie}>
        <Input placeholder="Password" name="password" />
        <Button className="mt-4">Submit</Button>
      </form>
    </>
  );
}
