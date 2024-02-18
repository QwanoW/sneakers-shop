type SelectSizeProps = {
  handleSelectSize: (size: number) => void;
  selectedSize: number;
  size: number;
};

export const SelectSize = ({ handleSelectSize, selectedSize, size }: SelectSizeProps) => {
  return (
    <div
      onClick={() => handleSelectSize(size)}
      className={`w-full h-16 border border-gray-200 flex items-center justify-center cursor-pointer ${size === selectedSize ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <p>{size}</p>
    </div>
  );
};
