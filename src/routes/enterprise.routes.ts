import { Router } from 'express'
import  * as enterpriseCtrl from '../controllers/enterprise.controllers'

const EnterpriseRoter = Router()

EnterpriseRoter.get('/prueba', enterpriseCtrl.prueba);
EnterpriseRoter.post('/empresa',enterpriseCtrl.crear);
export default EnterpriseRoter