
export default function AppBar() {
  return (
    <div className="flex justify-between gap-8 items-center">
      <UserInfo />
    </div>
  );
}

function UserInfo() {
  return (
    <div className="flex gap-3 items-center">
      <img
        className="h-8 w-8 object-cover rounded-full border-2 border-border text-center text-xs text-text-tertiary "
        src="/images/default-profile.jpg"
        alt="profile image"
      />
      <div>
        <h3 className="font-medium text-sm text-text-primary">John Doe</h3>
        <h4 className="text-xs text-text-tertiary">Admin</h4>
      </div>
    </div>
  );
}
