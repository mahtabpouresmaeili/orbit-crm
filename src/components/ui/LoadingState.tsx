interface LoadingStateProps {
  message?: string;
}
export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div role="status">
      <p>{message}</p>
    </div>
  );
}
