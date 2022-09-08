export class MedicationFakeDb
{
    public static medication = [
        {
            'id'      : '15459251a6d6b397565',
            'patientId'   : '5f6ee6f0b4785b15481894e9',
            'drug'    : {
                'atcCode':'https://www.whocc.no/',
                'name':'Panadol',
                'dosage':'20mg',
                'form':'tabs',
                'Route':'Oral'
            },
            'history': [
            {
                'startDate':'Jun 20, 2017',
                'stopDate':'Jun 28, 2017',  
                'duration':'8 day(s)',
                'frequency':'2 times per day',
                'status':'new medication added',
                'note'  : 'testNote',
            },
            {
                'startDate':'Jun 20, 2017',
                'stopDate':'Jun 28, 2017',  
                'duration':'8 day(s)',
                'frequency':'3 times per day',
                'status':'renewal',
                'note'  : 'testNote3',
            },
            {
                'startDate':'Jun 20, 2017',
                'stopDate':'Jun 28, 2017',  
                'duration':'8 day(s)',
                'frequency':'3 times per day',
                'status':'renewal',
                'note'  : 'testNote3',
            }
        ],
            
            'status' :{
                'isActive':true,
                'reason':null,
                            
            }
        },
        {
            'id'      : '15459251a6d6b39756567',
            'patientId'   : 'f51c8323ca3045ddc246fce',
            'drug'    : {
                'atcCode':'https://www.whocc.no/',
                'name':'Aspicot',
                'dosage':'20mg',
                'form':'tabs',
                'Route':'Oral'
            },
            'history': [
            {
                'startDate':'Jun 20, 2017',
                'stopDate':'Jun 28, 2017',  
                'duration':'8 day(s)',
                'frequency':'2 times per day',
                'status':'new medication added',
                'note'  : 'testNote1',
            },
            {
                'startDate':'Jun 20, 2017',
                'stopDate':'Jun 28, 2017',  
                'duration':'8 day(s)',
                'frequency':'3 times per day',
                'status':'renewal',
                'note'  : 'testNote2',
            }
        ],
            
            'status' :{
                'isActive':true,
                'reason':null,
            }
        },

        {
            'id'      : '15459251a6d6b39756985',
            'patientId'   : 'f51c8323ca3045ddc246fce',
            'drug'    : {
                'atcCode':'https://www.whocc.no/',
                'name':'gesta',
                'dosage':'30mg',
                'form':'tabs',
                'Route':'Oral'
            },
            'history': [
            {'startDate':'Jun 20, 2017',
            'stopDate':'Jun 28, 2017',  
            'duration':'8 day(s)',
                'frequency':'2 times per day',
                'status':'new medication added',
                'note'  : 'testNote',
            }
        ],
            
            'status' :{
                'isActive':true,
                'reason':null,
            }
        },
        {
            'id'      : '15459251a6d6b399997565',
            'patientId'   : 'f51c8323ca3045ddc246fce',
            'drug'    : {
                'atcCode':'https://www.whocc.no/',
                'name':'aspirine',
                'dosage':'50mg',
                'form':'tabs',
                'Route':'Oral'
            },
            'history': [
            {
                'startDate':'Jun 20, 2017',
                'stopDate':'Jun 28, 2017',  
                'duration':'8 day(s)',
                'frequency':'2 times per day',
                'status':'new medication added',
                'note'  : 'testNote',
            }
        ],
            
            'status' :{
                'isActive':true,
                'reason':null,
               
            }
        },
    ]
}