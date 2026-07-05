function LoadingState({ message = "Loading your shopping experience..." }) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border bg-white p-8 text-center">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-slate-950" />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-slate-950">
        Please hold on
      </h2>

      <p className="mt-2 text-sm text-slate-500">{message}</p>
    </div>
  );
}

export default LoadingState;