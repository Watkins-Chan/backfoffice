import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import { UploadOutlined } from '@ant-design/icons'

const FileUploadButton = ({ onFileUpload, isLoading }) => (
  <Tooltip title="Upload file">
    <IconButton component="label">
      <input type="file" hidden onChange={onFileUpload} accept=".xlsx" />
      {isLoading ? <CircularProgress size={20} /> : <UploadOutlined />}
    </IconButton>
  </Tooltip>
)

export default FileUploadButton
