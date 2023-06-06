type RoundButtonProps = {
  children: React.ReactNode;
  bgColor?: string;
  color?: string;
  handleClick?: () => void;
  disabled?: boolean;
  height?: string;
};

export function RoundButton({
  children,
  bgColor,
  color,
  handleClick,
  disabled = false,
  height,
}: RoundButtonProps) {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`aspect-square ${height ?? "h-6"} rounded-full ${
        bgColor ?? "bg-gray-900"
      } ${
        color ?? "text-white"
      } disabled:cursor-not-allowed disabled:opacity-5`}
    >
      {children}
    </button>
  );
}
