import { Container, Box, Grid, Typography, Card, Button, Divider,
  CardContent } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import HttpIcon from '@mui/icons-material/Http';
import CheckIcon from '@mui/icons-material/Check';

import { Link } from 'react-router-dom';


const LPtoC = () => {

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
              探すを簡単に
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
              PDF, URLなどを読み込んで会話形式で欲しい情報を探すことが出来ます。
            </Typography>
            <Link to='/signup'>
              <Button variant="contained" color="primary">
                会員登録
              </Button>
            </Link>
          </Grid>
          <Grid item md={7} style={styles.image_box}>
            <img src="../public/chatpage.png" alt="チャットページ" style={styles.image}/>
          </Grid>
        </Grid>

        <Divider />

        <Grid container style={styles.section}>
          <Typography variant='h2' style={styles.title_center}>
            複数ソースから
          </Typography>

          <Grid container rowSpacing={3} columnSpacing={5}>
            <Grid item xs={6} md={3}>
              <Card variant="outlined" style={styles.source_card}><PictureAsPdfIcon /> PDF</Card>
              <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
                一度に複数のPDFを読み込むことが出来、タイトルとページ番号によって参照可能になります。
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card variant="outlined" style={styles.source_card}><HttpIcon /> URL</Card>
              <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
                1つのURLから分岐的に複数のURLを読み込むことが出来ます。
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card variant="outlined" style={styles.source_card}><BorderAllIcon /> CSV</Card>
              <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
                参照名を指定することができ、よりわかりやすい会話が可能になります。
              </Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card variant="outlined" style={styles.source_card}><TextFieldsIcon /> テキスト</Card>
              <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
                PDFでもURLでもないテキストをコピペで読み込むことが出来ます。段落ごとに参照されます。
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        <Grid container rowSpacing={3} columnSpacing={5} style={styles.section}>
          <Grid item md={7} style={styles.image_box}>
            <img src="../public/home1.png" alt="チャットページ" style={{width: '100%'}}/>
          </Grid>
          <Grid item md={5}>
            <Typography variant='h2' style={styles.title2}>
              数クリックで簡単作成
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
              数十秒で欲しい情報を探せるチャットを作成することが出来ます。
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid container rowSpacing={3} columnSpacing={5} style={styles.section}>
          <Grid item md={5}>
            <Typography variant='h2' style={styles.title2}>
              作成したチャットの共有と解析
            </Typography>
            <Typography color="text.secondary" sx={{ marginBottom: '1rem' }}>
              どこで質問されて、どのような質問がされたかを解析することが出来ます。
              ※ 企業様向けの機能です。
            </Typography>
          </Grid>
          <Grid item md={7} style={styles.image_box}>
            <img src="../public/analysis.png" alt="チャットページ" style={{width: '100%'}}/>
          </Grid>
        </Grid>

        <Divider />

        <UseCase styles={styles} />

        <Divider />

        <PlanList styles={styles} />

      </Box>
    </Container>

  )
}


import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const UseCase = ({styles}) => {

  const cases = [
    {
      title: '勉強',
      description: 'うっかり忘れたときに質問'
    },
    {
      title: '塾・出版社',
      description: 'チャット形式で質問。質問履歴を解析し、教材を改善'
    },
    {
      title: '論文',
      description: 'ほしい箇所を要約してもらい、読みやすく'
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
      description: 'サイトをチャット形式に'
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

export default LPtoC;