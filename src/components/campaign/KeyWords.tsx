
interface KeywordProps {
    keyword: string;
    onRemove: (keyword: string) => void;
  }
  
  export const Keyword: React.FC<KeywordProps> = ({ keyword, onRemove }) => {
    return (
      <div className="inline-flex items-center text-[9px] px-[5px] py-[2px] m-1 bg-teal-600 text-white rounded-full">
        {keyword}
        <button
          onClick={() => onRemove(keyword)}
          className="ml-2 text-[9px] text-white"
        >
          ✕
        </button>
      </div>
    );
  };