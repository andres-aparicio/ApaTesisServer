import { Router } from 'express'
import  * as enterpriseCtrl from '../controllers/enterprise.controllers'

const EnterpriseRoter = Router()

EnterpriseRoter.post('/empresa',enterpriseCtrl.crear);
export default EnterpriseRoter