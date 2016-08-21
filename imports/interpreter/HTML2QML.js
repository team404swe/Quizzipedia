export default function HTML2QML(JSObject)
{    
	var QMLString = NULL; 

	switch (JSObject.type)
    {   case "VF":
           	QMLString = getQMLVF();
            break; 
        case "MU":
            QMLString = getQMLMU();
            break;
        case "MX":
        	QMLString = getQMLMX();
            break; 
        case "AS":
            QMLString = getQMLAS();	       
            break;
        case "OD": 
			QMLString = getQMLOD();
            break; 
        default:
            break; 
    }   
	return QMLString;  
}

function getQMLVF(){}

function getQMLMU(){}

function getQMLMX(){}

function getQMLAS(){}

function getQMLOD(){}

