import { Router } from 'express'; 

interface Controller{
    mainPath: string;
    router: Router;
};

export default Controller;