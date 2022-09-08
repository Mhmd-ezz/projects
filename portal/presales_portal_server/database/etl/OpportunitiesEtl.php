<?php

namespace database\etl;

use App\Opportunity;

class OpportunitiesEtl
{
    public static function pushOpportunities()
    {
        $extracted_opportunities  = [
            [
                "Country" => "France",
                "Account Manager" => "Jerome Andre",
                "Client" => "CiviPol",
                "Chance of Winning" => "Low",
                "Client submission date" => "12-Apr",
                "Channel" => "Public",
                "Project Description" => "GED",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Ralf Saad",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "30-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => "Product",
                " Solution Category  " => "Odoo"
            ],
            [
                "Country" => "Qatar",
                "Account Manager" => "Rony ABI NADER ",
                "Client" => "Doha Institute",
                "Chance of Winning" => "Low",
                "Client submission date" => "31-Mar",
                "Channel" => "Public",
                "Project Description" => "Website development",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Bahaa Audi",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "30-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => "Portal",
                " Solution Category  " => "Custom Solution"
            ],
            [
                "Country" => "KSA",
                "Account Manager" => "Zeina ATRISSI",
                "Client" => "Monshaat",
                "Chance of Winning" => "Low",
                "Client submission date" => "23-Mar",
                "Channel" => "Public",
                "Project Description" => "Digital Transformation",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Sanaa Hasbani",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "29-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => "Presales Solution",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "UAE",
                "Opportunity Status" => "Evaluation",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "29-Mar",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "France",
                "Account Manager" => "Jerome Andre",
                "Client" => "Pays de la Loire",
                "Chance of Winning" => "Low",
                "Client submission date" => "22-Mar",
                "Channel" => "Public",
                "Project Description" => "Fourniture d'une solution informatique d'un système de gestion des données amiante",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Ralf Saad",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "22-Mar",
                "Allocation Date" => "22-Feb",
                " Task Type " => "Proposal",
                " Final Submitted Price " => "Presales Solution",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "Morocco",
                "Account Manager" => "Yassine ABOU-KADRI",
                "Client" => "DAAG ",
                "Chance of Winning" => "Low",
                "Client submission date" => "22-Mar",
                "Channel" => "Public",
                "Project Description" => "Document management automation and archiving",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Lara Kanaan",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "11-Apr",
                " Task Type " => "Proposal",
                " Final Submitted Price " => "Product",
                " Solution Category  " => "Web Portal internet"
            ],
            [
                "Country" => "Qatar",
                "Account Manager" => "Patricia Alkosseifi ",
                "Client" => "Community College of Qatar",
                "Chance of Winning" => "Low",
                "Client submission date" => "28-Mar",
                "Channel" => "Public",
                "Project Description" => "Business Process Management",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Sanaa Hasbani",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "30-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => "Product",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "KSA",
                "Account Manager" => "Anas JWABRIH",
                "Client" => "Ministry of Municipal and Rural Affairs MOMRA",
                "Chance of Winning" => "Medium",
                "Client submission date" => "16-Mar",
                "Channel" => "Direct",
                "Project Description" => "Smart Gates and Visitor management",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Mazen Farah",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "22-Mar",
                " Task Type " => "RFP Writing",
                " Final Submitted Price " => "Presales Solution",
                " Solution Category  " => "Custom Solution"
            ],
            [
                "Country" => "UAE",
                "Account Manager" => "Adeel RAHMAN",
                "Client" => "Human Resources Authority",
                "Chance of Winning" => "Medium",
                "Client submission date" => "22-Mar",
                "Channel" => "Private",
                "Project Description" => "DMS",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Cynthia Fayad",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "22-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => "Product",
                " Solution Category  " => "Custom Solution"
            ],
            [
                "Country" => "Lebanon",
                "Account Manager" => "Roland SALAMEH",
                "Client" => "Caritas",
                "Chance of Winning" => "Low",
                "Client submission date" => "17-Mar",
                "Channel" => "Direct",
                "Project Description" => "Odoo ERP",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Samir George",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "17-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => " $25,000.00 ",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "UAE",
                "Account Manager" => "Adeel RAHMAN",
                "Client" => "Family Development Foundation",
                "Chance of Winning" => "Low",
                "Client submission date" => "17-Mar",
                "Channel" => "Private",
                "Project Description" => "BPM, Power BI, Database Merge",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Rana Abou Chakra",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "15-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => " $280,000.00 ",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "Morocco",
                "Account Manager" => "Yassine ABOU-KADRI",
                "Client" => "RADEES ",
                "Chance of Winning" => "Low",
                "Client submission date" => "15-Mar",
                "Channel" => "Public",
                "Project Description" => "Document management automation and archiving",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Lara Kanaan",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "15-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => " $132,000.00 ",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "KSA",
                "Account Manager" => "Ehab Kamel",
                "Client" => "Husam Alyasin",
                "Chance of Winning" => "Medium",
                "Client submission date" => "10-Mar",
                "Channel" => "Direct",
                "Project Description" => "Archive and DMS",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Elida Oueiss",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "10-Mar",
                " Task Type " => "RFP Writing",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "KSA",
                "Account Manager" => "Ehab Kamel",
                "Client" => "Bishah University",
                "Chance of Winning" => "Medium",
                "Client submission date" => "10-Mar",
                "Channel" => "Direct",
                "Project Description" => "CTS DMS and Meeting Management ",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Elida Oueiss",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "10-Mar",
                " Task Type " => "RFP Writing",
                " Solution Category  " => "Custom Solution"
            ],
            [
                "Country" => "Lebanon",
                "Account Manager" => "Roland SALAMEH",
                "Client" => "Ministry of Social Affairs MOSA",
                "Chance of Winning" => "Very Low",
                "Client submission date" => "15-Mar",
                "Channel" => "Public",
                "Project Description" => "Public website and content management system",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Cynthia Fayad",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "13-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => " $30,000.00 ",
                " Solution Category  " => "Presales Solution"
            ],
            [
                "Country" => "France",
                "Account Manager" => "Jerome Andre",
                "Client" => "INSTITUT NATIONAL DE LA PROPRIETE INDUSTRIELLE (INPI) ",
                "Chance of Winning" => "Low",
                "Client submission date" => "11-Mar",
                "Channel" => "Public",
                "Project Description" => "Solution informatique pour la gestion de la certification en langue arabe",
                "Opportunity Status" => "Shortlisted",
                "Presales Resource" => "Ralf Saad",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "9-Mar",
                " Task Type " => "Proposal",
                " RFP Budget " => " $200,000.00 ",
                " Final Submitted Price " => " $115,000.00 ",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "France",
                "Account Manager" => "Jerome Andre",
                "Client" => "Institut du Monde Arabe",
                "Chance of Winning" => "Low",
                "Client submission date" => "11-Mar",
                "Channel" => "Public",
                "Project Description" => "Solution informatique pour la gestion de la certification en langue arabe",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Lara Kanaan",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "9-Mar",
                " Task Type " => "Proposal",
                " RFP Budget " => " $200,000.00 ",
                " Final Submitted Price " => " $115,000.00 ",
                " Solution Category  " => "Presales Solution"
            ],
            [
                "Country" => "KSA",
                "Account Manager" => "Zeina ATRISSI",
                "Client" => "Bureau of experts",
                "Chance of Winning" => "Low",
                "Client submission date" => "10-Mar",
                "Channel" => "Direct",
                "Project Description" => "Policy Management",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Bahaa Bou AKL",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "8-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => " $150,000.00 ",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "Qatar",
                "Account Manager" => "Hassan SHOHEITLY",
                "Client" => "Orbis Project",
                "Chance of Winning" => "Low",
                "Client submission date" => "14-Mar",
                "Channel" => "Direct",
                "Project Description" => "Case Demo Incident Notification Decision ",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Rana Abou Chakra",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "12-Mar",
                " Task Type " => "Demo",
                " Solution Category  " => "Presales Solution"
            ],
            [
                "Country" => "Senegal",
                "Account Manager" => "Kader",
                "Client" => "Prospect No2: Secteur gouvernement ( voir mail transféré ci dessous). A ta disposition pour plus d'infos. ",
                "Chance of Winning" => "Very Low",
                "Client submission date" => "12-Mar",
                "Channel" => "Direct",
                "Project Description" => "GED",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Bahaa Bou AKL",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "10-Mar",
                " Task Type " => "Demo",
                " Solution Category  " => "Presales Solution"
            ],
            [
                "Country" => "Senegal",
                "Account Manager" => "Kader",
                "Client" => "Prospect No1 :Secteur transport maritime et logistique ",
                "Chance of Winning" => "Very Low",
                "Client submission date" => "12-Mar",
                "Channel" => "Direct",
                "Project Description" => "GED",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Bahaa Bou AKL",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "10-Mar",
                " Task Type " => "Demo",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "UAE",
                "Account Manager" => "Adeel RAHMAN",
                "Client" => "Abu Dhabi Accountability Authority ADAA",
                "Chance of Winning" => "Medium",
                "Client submission date" => "8-Mar",
                "Channel" => "Direct",
                "Project Description" => "Correspondence and Records management",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Cynthia Fayad",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "6-Mar",
                " Task Type " => "Demo",
                " Solution Category  " => "Presales Solution"
            ],
            [
                "Country" => "Senegal",
                "Account Manager" => "Kader",
                "Client" => "Insurance Companie",
                "Chance of Winning" => "Very Low",
                "Client submission date" => "8-Mar",
                "Channel" => "Direct",
                "Project Description" => "Insurance Case Flow",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Rana Abou Chakra",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "6-Mar",
                " Task Type " => "Demo",
                " Solution Category  " => "Product"
            ],
            [
                "Country" => "Kuwait",
                "Account Manager" => "Mohamed KHACHEB",
                "Client" => " Kuwait University",
                "Chance of Winning" => "Low",
                "Client submission date" => "8-Mar",
                "Channel" => "Public",
                "Project Description" => "Digital Library and automation of services",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Sanaa Hasbani",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "6-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => " $130,000.00 ",
                " Solution Category  " => "Odoo"
            ],
            [
                "Country" => "Qatar",
                "Account Manager" => "MarieTherese AMMOUN",
                "Client" => "Qatar Airways",
                "Chance of Winning" => "Medium",
                "Client submission date" => "6-Mar",
                "Channel" => "Public",
                "Project Description" => "Dms for engineering",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Mazen Farah",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "6-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => " $528,000.00 "
            ],
            [
                "Country" => "KSA",
                "Account Manager" => "Zeina ATRISSI",
                "Client" => "JEDDAH DEVELOPMENT AND URBAN REGENERATION CO.",
                "Chance of Winning" => "Medium",
                "Client submission date" => "3-Mar",
                "Channel" => "Private",
                "Project Description" => "CTS and Backlog",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Bahaa Bou AKL",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "3-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => " $250,000.00 "
            ],
            [
                "Country" => "Qatar",
                "Account Manager" => "MarieTherese AMMOUN",
                "Client" => "Kahramma ",
                "Chance of Winning" => "Medium",
                "Client submission date" => "3-Mar",
                "Channel" => "Direct",
                "Project Description" => "Document Management for engeneering",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Bahaa Bou AKL",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "3-Mar",
                " Task Type " => "Demo"
            ],
            [
                "Country" => "Senegal",
                "Account Manager" => "Kader",
                "Client" => "CBIS Bank",
                "Chance of Winning" => "Very Low",
                "Client submission date" => "3-Mar",
                "Channel" => "Direct",
                "Project Description" => "DMS demo",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Bahaa Bou AKL",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "3-Mar",
                " Task Type " => "Demo"
            ],
            [
                "Country" => "UAE",
                "Account Manager" => "Adeel RAHMAN",
                "Client" => "G42",
                "Chance of Winning" => "Medium",
                "Client submission date" => "10-Mar",
                "Channel" => "Direct",
                "Project Description" => "Productivity Portal",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Mazen Farah",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "10-Mar",
                " Task Type " => "Demo"
            ],
            [
                "Country" => "Qatar",
                "Account Manager" => "Hassan SHOHEITLY",
                "Client" => "NADRA Pakistan",
                "Chance of Winning" => "Medium",
                "Client submission date" => "3-Mar",
                "Channel" => "Direct",
                "Project Description" => "Strategy and CTS demo",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Bahaa Bou AKL",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "3-Mar",
                " Task Type " => "Demo"
            ],
            [
                "Country" => "Lebanon",
                "Account Manager" => "Roland SALAMEH",
                "Client" => "Ministry of Education and Higher Education MEHE",
                "Chance of Winning" => "Medium",
                "Client submission date" => "6-Mar",
                "Channel" => "Public",
                "Project Description" => "Document management and Correspondence ",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Elida Oueiss",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "6-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => " $20,000.00 "
            ],
            [
                "Country" => "Qatar",
                "Account Manager" => "MarieTherese AMMOUN",
                "Client" => "Ministry of culture",
                "Chance of Winning" => "Medium",
                "Client submission date" => "3-Mar",
                "Channel" => "Direct",
                "Project Description" => "Insight, public view, watermark (Hasan sho7aytli)",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Mazen Farah",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "3-Mar",
                " Task Type " => "Demo"
            ],
            [
                "Country" => "Egypt",
                "Account Manager" => "Samir George",
                "Client" => "ETF Construction",
                "Chance of Winning" => "Medium",
                "Client submission date" => "3-Mar",
                "Channel" => "Direct",
                "Project Description" => "Odoo ERP",
                "Opportunity Status" => "Evaluation",
                "Presales Resource" => "Samir George",
                "Presales Task Status" => "Submitted",
                "Task Due Date" => "3-Mar",
                " Task Type " => "Proposal",
                " Final Submitted Price " => " $30,000.00 "
            ]
        ];

        return $extracted_opportunities;

    }
}
