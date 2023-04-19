import { Container, Box, Grid, Typography, Card, Button, Divider,
  CardContent } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import MailLockIcon from '@mui/icons-material/MailLock';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import HttpIcon from '@mui/icons-material/Http';
import CheckIcon from '@mui/icons-material/Check';

import { Link } from 'react-router-dom';


const LPtoB = () => {

  const styles = {
    container: {
      paddingBottom: '10rem',
    },
    box: {
      display: 'flex',
      marginTop: '5rem',
      flexDirection: 'column',
      gap: '8rem',
    },
    image_box: {
      overflow: 'hidden',
    },
    image: {
      width: '150%',
    },
    section: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 'fit-content',
    },
    title: {
      fontSize: '3rem',
      marginBottom: '1rem',
    },
    title2: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
    },
    title_center: {
      fontSize: '2.5rem',
      margin: '0 auto',
      marginBottom: '1.5rem',
    },
    source_card: {
      width: '100%',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.2rem',
      marginBottom: '1rem',
    }
  }

  return (
    <Container component="main" style={styles.container}>
      <Box style={styles.box}>
        <Grid container rowSpacing={3} columnSpacing={5} style={styles.section}>
          <Grid item md={5}>
            <Typography variant='h2' style={styles.title}>
              あなたのサービスをチャット形式に
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
              あなたのサービスをチャット形式にすることで、よりわかりやすく、より多くの人に利用してもらうことが出来ます。
            </Typography>
            <Link to='/client/signup'>
              <Button variant="contained" color="primary">
                会員登録
              </Button>
            </Link>
          </Grid>
          <Grid item md={7} style={styles.image_box}>
            <img src="analysis.png" alt="チャットページ" style={styles.image}/>
          </Grid>
        </Grid>

        <Divider />

        <Grid container style={styles.section}>
          <>
            <Typography variant='h2' style={styles.title_center}>
              作ったチャットを共有
            </Typography>
            <Typography>
              ※ チャットの利用料金は、利用料に応じてチャットの作成者に請求されます。
            </Typography>
          </>
          <Grid container rowSpacing={3} columnSpacing={5}>
            <Grid item xs={6}>
              <Card variant="outlined" style={styles.source_card}><PublicIcon /> 一般公開</Card>
              <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
                アクセスコードを発行することで、誰でもチャットを利用することが出来ます。
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Card variant="outlined" style={styles.source_card}><MailLockIcon /> 限定公開</Card>
              <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
                メールアドレスでチャットを利用できる人を制限することが出来ます。
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        <Grid container rowSpacing={3} columnSpacing={5} style={styles.section}>
          <Grid item md={7} style={styles.image_box}>
            <img src="analysis.png" alt="チャットページ" style={{width: '100%'}}/>
          </Grid>
          <Grid item md={5}>
            <Typography variant='h2' style={styles.title2}>
              フィードバックをもらう
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
              チャットを利用してもらうことで、どの箇所がわかりにくいのか、どのような質問がされているのかを知ることが出来ます。
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container rowSpacing={3} columnSpacing={5} style={styles.section}>
          <Grid item md={5}>
            <Typography variant='h2' style={styles.title2}>
              ユーザーにわかりやすい参照
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
              ユーザーの質問に対し、どの箇所を用いて回答したかが表示されます。これにより、あなたのサービスへの情報のアクセスが容易になります。
            </Typography>
          </Grid>
          <Grid item md={7} style={styles.image_box}>
            <img src="chatpage.png" alt="チャットページ" style={{width: '100%'}}/>
          </Grid>
        </Grid>

        <Divider />

        <UseCase styles={styles} />

        <Divider />

        {/* <PlanList styles={styles} /> */}

      </Box>
    </Container>

  )
}


import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const UseCase = ({styles}) => {

  const cases = [
    {
      title: '塾',
      description: '塾の教材をチャット形式にして、わかりやすく'
    },
    {
      title: '論文',
      description: 'ほしい箇所を要約してもらい、読みやすく'
    },
    {
      title: '社内マニュアル',
      description: '情報を探す時間を短縮して、効率化'
    },
    {
      title: '新入社員に向けて',
      description: '企業のマニュアルからわからないところを質問'
    },
    {
      title: '引き継ぎ',
      description: 'チャットを作成しておいて、引き継ぎをスムーズに'
    },
    {
      title: '情報収集',
      description: '必要な部分箇所のみを抽出・要約・回答'
    },
    {
      title: '取扱説明書',
      description: '商品の取扱説明書をチャット形式に'
    },
    {
      title: 'ウェブサイト',
      description: '一般公開して、サイトへのアクセスを増やす'
    },
  ]

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 120,
    lineHeight: '120px',
  }));

  return (
    <Grid container style={styles.section}>
      <Typography variant='h2' style={styles.title_center}>
        利用シーン
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={5}>
        {cases.map((case_, index) => (
          <Grid item xs={6} md={3}>
              <Item key={index} elevation={12}>
                <Typography >{case_.title}</Typography>
                <Typography color="text.secondary">
                  {case_.description}
                </Typography>
              </Item>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

const PlanList = ({styles}) => {

  const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem',
  };

  const contentStyle = {
    flexGrow: 1,
    textAlign: 'center',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  };

  const listItemStyle = {
    padding: '0.7rem',
    display: 'flex',
    justifyContent: 'center',
  };

  const plans = [
    {
      title: 'Free',
      description: 'お試し用',
      price: '$0.00',
      features: ['企業チャット利用無料', '個人チャット一度に2つまで', 'メッセージ上限 10回/日', 'PDFファイル上限 2MB', '読み取りURL上限 3つ'],
    },
    {
      title: 'Starter',
      description: '個人ライトユーザー向け',
      price: '$9.99',
      features: ['企業チャット利用無料', '個人チャット一度に10個まで', 'メッセージ上限 100回/日', 'PDFファイル上限 5MB', '読み取りURL上限 10個'],
    },
    {
      title: 'Pro',
      description: '個人利用の最高峰',
      price: '$29.99',
      features: ['企業チャット利用無料', '個人チャット無制限', 'メッセージ上限 1000回/日', 'PDFファイル上限 5MB', '読み取りURL上限 100個'],
    },
    {
      title: 'Enterprise',
      description: '企業向け',
      price: 'カスタム',
      features: ['利用ユーザーの使用負担なし', 'チャット共有', 'チャット解析機能', 'PDFファイル上限 5MB', '読み取りURL上限 1000個'],
    },
  ];

  return (
    <>
    <Grid container style={styles.section}>
      <Typography variant='h2' style={styles.title_center}>
        料金プラン
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={5}>
        {plans.map((plan, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Card style={cardStyle}>
              <CardContent style={contentStyle}>
              <Typography variant='h2' sx={{ fontSize: 25 }} gutterBottom>
                {plan.title}
              </Typography>

              <Typography sx={{ fontSize: 30 }} gutterBottom>
                {plan.price}/月
              </Typography>

                <ul style={listStyle}>
                  {plan.features.map((feature, index) => (
                    <li key={index} style={listItemStyle}>
                      <CheckIcon color='success' /> {feature}
                    </li>
                  ))}
                </ul>
                {
                  plan.title === 'Enterprise' &&
                  <Link to={'/client'}>
                    <Button variant='contained' color='primary'>団体向けページへ</Button>
                  </Link>
                }
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
    </>
  )
}

export default LPtoB;