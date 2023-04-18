import { Grid } from '@mui/material';

const Waiting = () => {
  return (

    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      marginTop="10vh"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <div className="waiting">
          <h1>メールを確認してください</h1>
          <p>入力されたメールアドレスに確認メールを送信しました。</p>
          <p>メールを確認して、メール内のリンクをクリックしてください。</p>
        </div>
      </Grid>
    </Grid>
  );
}

export default Waiting;