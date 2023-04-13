import LaunchIcon from '@mui/icons-material/Launch';

export const OpenLink = ({ has_link, href }) => {
  return (
    <>
    {
      has_link && <a href={href} target="_blank" style={{verticalAlign: 'middle'}}><LaunchIcon /></a>
    }
    </>
  )
}
// export default OpenLink