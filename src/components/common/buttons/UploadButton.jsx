import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import { UploadOutlined } from '@ant-design/icons'

const UploadButton = ({ onFileUpload, isLoading }) => (
  <Tooltip title="Import data">
    <span>
      <IconButton component="label">
        <input type="file" hidden onChange={onFileUpload} accept=".xlsx" />
        {isLoading ? <CircularProgress size={20} /> : <UploadOutlined />}
      </IconButton>
    </span>
  </Tooltip>
)

export default UploadButton
