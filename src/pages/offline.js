export default function OfflinePage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold">You're Offline</h1>
      <p className="mt-2">
        It looks like you have lost your internet connection.
      </p>
      <p className="mt-1">Please reconnect and try again.</p>
    </div>
  );
}
