interface EmojiProps extends React.HTMLAttributes<HTMLSpanElement> {
  emoji: string;
  size?: number;
}

function Emoji({ emoji, size = 24, ...props }: EmojiProps) {
  return (
    <span
      role="img"
      aria-label={props["aria-label"]}
      style={{ fontSize: size + "px" }}
    >
      {emoji}
    </span>
  );
}

export { Emoji };
