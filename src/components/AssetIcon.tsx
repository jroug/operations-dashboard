interface AssetIconProps {
  source: string;
  size: number;
}

export default function AssetIcon({ source, size }: AssetIconProps) {
  return (
    <i
      className="asset-icon"
      style={{ width: size, height: size, display: "inline-flex", flex: "0 0 auto", lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}
