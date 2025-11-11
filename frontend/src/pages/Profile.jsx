export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return (
    <div className="card">
      <div className="card-title">Profile</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div><span className="opacity-70">Name:</span> {user.name || '—'}</div>
        <div><span className="opacity-70">Email:</span> {user.email || '—'}</div>
        <div><span className="opacity-70">Role:</span> {user.role || 'user'}</div>
      </div>
    </div>
  )
}


