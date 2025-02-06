import { User } from "@/types/user";

export default async function HomePage() {
  const response = await fetch("http://localhost:8080/api/v1/users");
  const users = await response.json();

  console.log(users);

  if (!users || !Array.isArray(users)) {
    return <p>No users found</p>;
  }

  return (
    <section>
      {users.map((user: User) => {
        return (
          <div key={user.id}>
            <p>name: {user.name}</p>
            <p>email: {user.email}</p>
          </div>
        );
      })}
    </section>
  );
}
