import { Link } from 'react-router-dom';

const LPtoB = () => {

  return (
    <>
      <div>hello world</div>
      <Link to='/client/signup'>
        <button>企業向け会員登録</button>
      </Link>
      <Link to='/client/login'>
        <button>企業向けログイン</button>
      </Link>
      <br></br>
      <Link to='/signup'>
        <button>普通の会員登録</button>
      </Link>
      <Link to='/login'>
        <button>普通のログイン</button>
      </Link>
    </>
  )
}

export default LPtoB;