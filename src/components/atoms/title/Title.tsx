const Title = () => {
  // 식탁일기를 상수로 가져오면 좋을 것 같음
  const handleClickRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };

  return (
    <button onClick={handleClickRedirect}>
      <h3 className="text-white01 font-semibold">식탁일기</h3>
    </button>
  );
};

export default Title;
