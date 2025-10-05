const HomePage = () => {
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  return (
    <div>{secretKey}</div>
  )
}

export default HomePage