import { useState } from "react";
import { toast } from "sonner";
import { Document, NewDocument } from "@/components/documents/types";
import DocumentFilters from "@/components/documents/DocumentFilters";
import DocumentTabs from "@/components/documents/DocumentTabs";
import DocumentViewDialog from "@/components/documents/DocumentViewDialog";
import DocumentEditDialog from "@/components/documents/DocumentEditDialog";
import CreateDocumentDialog from "@/components/documents/CreateDocumentDialog";

const Documents = () => {
  // State for documents
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "DOC-001",
      title: "Quality Management System Manual",
      type: "SOP",
      status: "Approved",
      project: "Nanomaterial Research",
      qmsType: "ISO 9001",
      updatedAt: "2023-09-15",
      author: "Dr. Alex Johnson",
      version: "1.2",
      content: `# Quality Management System Manual

## 1. Introduction
This manual describes the Quality Management System (QMS) implemented at our organization to ensure consistent quality in our products and services.

## 2. Scope
This manual applies to all activities, processes, and personnel within the organization that affect product and service quality.

## 3. Quality Policy
Our organization is committed to:
- Meeting customer requirements
- Continual improvement
- Compliance with applicable regulations
- Maintaining a culture of quality

## 4. Process Approach
Our QMS is based on a process approach, recognizing that desired outcomes are achieved more efficiently when activities are managed as interrelated processes.

## 5. Risk-Based Thinking
Risk-based thinking is applied throughout our QMS to prevent nonconformities and identify opportunities for improvement.

## 6. Documentation Structure
The QMS documentation includes:
- This Quality Manual
- Procedures
- Work Instructions
- Forms and Records

## 7. Management Responsibility
Top management demonstrates leadership and commitment to the QMS through:
- Taking accountability for QMS effectiveness
- Establishing quality policy and objectives
- Ensuring integration of QMS requirements into business processes
- Promoting awareness of the process approach and risk-based thinking
- Ensuring resources are available

## 8. Resource Management
The organization determines and provides resources needed for:
- Implementation and maintenance of the QMS
- Continual improvement
- Customer satisfaction

## 9. Product/Service Realization
The organization plans and develops the processes needed for product/service realization, including:
- Customer-related processes
- Design and development
- Purchasing
- Production and service provision
- Control of monitoring and measuring equipment

## 10. Measurement, Analysis and Improvement
The organization implements monitoring, measurement, analysis, and improvement processes to:
- Demonstrate conformity of products/services
- Ensure QMS conformity
- Continually improve QMS effectiveness`,
      description: "Comprehensive manual outlining the organization's quality management system structure"
    },
    {
      id: "DOC-002",
      title: "Risk Management Report",
      type: "Report",
      status: "In Review",
      project: "Medical Device Prototype",
      qmsType: "ISO 13485",
      updatedAt: "2023-09-20",
      author: "Dr. Sarah Williams",
      version: "0.9",
      content: `# Risk Management Report

## Executive Summary
This report documents the risk management activities conducted for the Medical Device Prototype project in accordance with ISO 14971.

## 1. Introduction
### 1.1 Purpose
The purpose of this risk management report is to document the risk management activities and results for the Medical Device Prototype project.

### 1.2 Scope
This report covers all aspects of the device from design through production and post-market surveillance.

### 1.3 References
- ISO 14971:2019 Medical devices — Application of risk management to medical devices
- Project documentation and specifications
- Applicable regulatory requirements

## 2. Risk Management Process
### 2.1 Risk Management Plan
The risk management plan was established and approved on [DATE]. It defined the activities, responsibilities, and criteria for risk acceptability.

### 2.2 Risk Management Team
The following individuals participated in the risk management activities:
- Dr. Sarah Williams (Risk Management Lead)
- John Smith (Mechanical Engineer)
- Lisa Johnson (Electrical Engineer)
- Dr. Robert Taylor (Clinical Specialist)
- Jane Brown (Quality Assurance)

## 3. Risk Analysis
### 3.1 Intended Use and Identification of Characteristics
The Medical Device Prototype is intended for [DESCRIPTION OF INTENDED USE].

### 3.2 Identification of Hazards
The following potential hazards were identified:
1. Electrical hazards
2. Mechanical hazards
3. Biological hazards
4. Environmental hazards
5. Information hazards

### 3.3 Risk Estimation
For each hazard, the severity and probability were estimated resulting in a risk index.

## 4. Risk Evaluation
### 4.1 Risk Control Measures
The following risk control measures were implemented:
1. Design modifications
2. Protective measures
3. Information for safety

### 4.2 Residual Risk Evaluation
After implementation of risk control measures, residual risks were evaluated against acceptance criteria.

## 5. Production and Post-Production Information
A post-production monitoring plan has been established to collect and review information about the device in the production and post-production phases.

## 6. Conclusion
The risk management activities have demonstrated that all identified risks have been reduced to acceptable levels and the overall residual risk is acceptable.

## 7. Approval
This risk management report requires approval from the following individuals:
- [Name, Title, Date]
- [Name, Title, Date]
- [Name, Title, Date]`,
      description: "Comprehensive analysis of potential risks associated with the medical device prototype"
    },
    {
      id: "DOC-003",
      title: "HACCP Plan Template",
      type: "Template",
      status: "Approved",
      project: "Food Packaging Material",
      qmsType: "HACCP",
      updatedAt: "2023-08-05",
      author: "Dr. Jennifer Lee",
      version: "2.1",
      content: `# HACCP Plan Template

## 1. Product Description
- Product Name: [PRODUCT NAME]
- Product Characteristics: [DESCRIBE PHYSICAL/CHEMICAL PROPERTIES]
- Intended Use: [DESCRIBE HOW THE PRODUCT WILL BE USED]
- Packaging: [DESCRIBE PACKAGING MATERIALS AND METHODS]
- Shelf Life: [SPECIFY SHELF LIFE AND STORAGE CONDITIONS]
- Distribution: [DESCRIBE DISTRIBUTION METHODS]
- Target Consumers: [SPECIFY INTENDED CONSUMERS]

## 2. Process Flow Diagram
[INSERT FLOW DIAGRAM]

## 3. Hazard Analysis

| Process Step | Potential Hazard | Hazard Type (B/C/P) | Likelihood | Severity | Significant? | Justification | Control Measures |
|-------------|------------------|---------------------|------------|----------|--------------|---------------|-----------------|
| [Step 1]    | [Hazard]         | [B/C/P]             | [L/M/H]    | [L/M/H]  | [Y/N]        | [Rationale]   | [Controls]      |
| [Step 2]    | [Hazard]         | [B/C/P]             | [L/M/H]    | [L/M/H]  | [Y/N]        | [Rationale]   | [Controls]      |
| [Step 3]    | [Hazard]         | [B/C/P]             | [L/M/H]    | [L/M/H]  | [Y/N]        | [Rationale]   | [Controls]      |

## 4. Critical Control Points (CCPs)

| CCP No. | Process Step | Hazard | Critical Limits | Monitoring Procedures | Corrective Actions | Verification Procedures | Record-Keeping Procedures |
|---------|--------------|--------|-----------------|----------------------|-------------------|------------------------|---------------------------|
| CCP 1   | [Step]       | [Hazard] | [Limits]      | [Monitoring]        | [Actions]         | [Verification]         | [Records]                 |
| CCP 2   | [Step]       | [Hazard] | [Limits]      | [Monitoring]        | [Actions]         | [Verification]         | [Records]                 |

## 5. Verification and Validation

### 5.1 Verification Activities
- [DESCRIBE VERIFICATION ACTIVITIES]

### 5.2 Validation Activities
- [DESCRIBE VALIDATION ACTIVITIES]

## 6. Record-Keeping

### 6.1 CCP Monitoring Records
- [LIST RECORDS TO BE MAINTAINED]

### 6.2 Corrective Action Records
- [LIST RECORDS TO BE MAINTAINED]

### 6.3 Verification Records
- [LIST RECORDS TO BE MAINTAINED]

## 7. HACCP Plan Review
- Scheduled Review Date: [DATE]
- Actual Review Date: [DATE]
- Reviewers: [NAMES AND POSITIONS]
- Changes Made: [DESCRIPTION OF CHANGES]

## 8. HACCP Team Information
- Team Leader: [NAME AND POSITION]
- Team Members: [NAMES AND POSITIONS]
- External Consultants: [NAMES AND ORGANIZATIONS]

## 9. Approval

| Name | Position | Signature | Date |
|------|----------|-----------|------|
| [Name] | [Position] | | [Date] |
| [Name] | [Position] | | [Date] |`,
      description: "Template for creating a Hazard Analysis Critical Control Point (HACCP) plan for food safety"
    },
    {
      id: "DOC-004",
      title: "Material Safety Data Sheet",
      type: "Form",
      status: "Draft",
      project: "Pharmaceutical Compound",
      qmsType: "cGMP",
      updatedAt: "2023-09-18",
      author: "Dr. James Taylor",
      version: "0.3",
      content: `# Material Safety Data Sheet

## 1. Identification
- Product Name: [PRODUCT NAME]
- Product Code: [PRODUCT CODE]
- Recommended Use: [DESCRIBE USES]
- Restrictions on Use: [LIST RESTRICTIONS]
- Manufacturer Information:
  - Name: [COMPANY NAME]
  - Address: [COMPANY ADDRESS]
  - Phone: [PHONE NUMBER]
  - Emergency Contact: [EMERGENCY PHONE NUMBER]

## 2. Hazards Identification
- Classification of the Substance/Mixture: [GHS CLASSIFICATION]
- Label Elements:
  - Signal Word: [WARNING/DANGER]
  - Hazard Statements: [LIST HAZARD STATEMENTS]
  - Precautionary Statements: [LIST PRECAUTIONARY STATEMENTS]
- Other Hazards: [DESCRIBE ANY HAZARDS NOT COVERED BY GHS]

## 3. Composition/Information on Ingredients

| Chemical Name | CAS Number | Concentration (%) | Classification |
|---------------|------------|-------------------|----------------|
| [Name]        | [CAS No.]  | [Percentage]      | [Classification] |
| [Name]        | [CAS No.]  | [Percentage]      | [Classification] |

## 4. First-Aid Measures
- General Advice: [GENERAL FIRST AID ADVICE]
- Eye Contact: [INSTRUCTIONS]
- Skin Contact: [INSTRUCTIONS]
- Inhalation: [INSTRUCTIONS]
- Ingestion: [INSTRUCTIONS]
- Most Important Symptoms/Effects: [DESCRIPTION]
- Indication of Immediate Medical Attention: [INSTRUCTIONS]

## 5. Fire-Fighting Measures
- Suitable Extinguishing Media: [LIST MEDIA]
- Unsuitable Extinguishing Media: [LIST MEDIA]
- Specific Hazards: [DESCRIBE HAZARDS]
- Special Protective Equipment: [DESCRIBE EQUIPMENT]
- Firefighting Instructions: [INSTRUCTIONS]

## 6. Accidental Release Measures
- Personal Precautions: [PRECAUTIONS]
- Environmental Precautions: [PRECAUTIONS]
- Methods for Containment and Cleaning Up: [METHODS]

## 7. Handling and Storage
- Precautions for Safe Handling: [PRECAUTIONS]
- Conditions for Safe Storage: [CONDITIONS]
- Incompatibilities: [LIST INCOMPATIBLE MATERIALS]

## 8. Exposure Controls/Personal Protection
- Exposure Limits: [LIST APPLICABLE EXPOSURE LIMITS]
- Engineering Controls: [DESCRIBE CONTROLS]
- Personal Protective Equipment:
  - Eye/Face Protection: [REQUIREMENTS]
  - Skin Protection: [REQUIREMENTS]
  - Respiratory Protection: [REQUIREMENTS]
  - General Hygiene Considerations: [CONSIDERATIONS]

## 9. Physical and Chemical Properties
- Appearance: [DESCRIPTION]
- Odor: [DESCRIPTION]
- pH: [VALUE]
- Melting Point/Freezing Point: [VALUE]
- Boiling Point: [VALUE]
- Flash Point: [VALUE]
- Evaporation Rate: [VALUE]
- Flammability: [DESCRIPTION]
- Vapor Pressure: [VALUE]
- Vapor Density: [VALUE]
- Relative Density: [VALUE]
- Solubility: [DESCRIPTION]
- Partition Coefficient: [VALUE]
- Auto-ignition Temperature: [VALUE]
- Decomposition Temperature: [VALUE]
- Viscosity: [VALUE]

## 10. Stability and Reactivity
- Reactivity: [DESCRIPTION]
- Chemical Stability: [DESCRIPTION]
- Possibility of Hazardous Reactions: [DESCRIPTION]
- Conditions to Avoid: [LIST CONDITIONS]
- Incompatible Materials: [LIST MATERIALS]
- Hazardous Decomposition Products: [LIST PRODUCTS]

## 11. Toxicological Information
- Information on Likely Routes of Exposure: [DESCRIPTION]
- Symptoms Related to Physical, Chemical, and Toxicological Characteristics: [DESCRIPTION]
- Acute Toxicity: [DATA]
- Skin Corrosion/Irritation: [DATA]
- Serious Eye Damage/Irritation: [DATA]
- Respiratory or Skin Sensitization: [DATA]
- Germ Cell Mutagenicity: [DATA]
- Carcinogenicity: [DATA]
- Reproductive Toxicity: [DATA]
- STOT-Single Exposure: [DATA]
- STOT-Repeated Exposure: [DATA]
- Aspiration Hazard: [DATA]

## 12. Ecological Information
- Ecotoxicity: [DATA]
- Persistence and Degradability: [DATA]
- Bioaccumulative Potential: [DATA]
- Mobility in Soil: [DATA]
- Other Adverse Effects: [DESCRIPTION]

## 13. Disposal Considerations
- Waste Treatment Methods: [METHODS]
- Contaminated Packaging: [DISPOSAL INSTRUCTIONS]

## 14. Transport Information
- UN Number: [NUMBER]
- UN Proper Shipping Name: [NAME]
- Transport Hazard Class(es): [CLASS]
- Packing Group: [GROUP]
- Environmental Hazards: [HAZARDS]
- Special Precautions for User: [PRECAUTIONS]

## 15. Regulatory Information
- Safety, Health, and Environmental Regulations: [REGULATIONS]

## 16. Other Information
- Revision Date: [DATE]
- Disclaimer: [DISCLAIMER TEXT]`,
      description: "Safety data sheet for pharmaceutical compound detailing hazards and safety information"
    },
    {
      id: "DOC-005",
      title: "Usability Testing Protocol",
      type: "SOP",
      status: "Approved",
      project: "Medical Device Prototype",
      qmsType: "IEC 62366",
      updatedAt: "2023-07-10",
      author: "Dr. Emily Chen",
      version: "1.0",
      content: `# Usability Testing Protocol

## 1. Purpose
This Standard Operating Procedure (SOP) outlines the process for conducting usability testing of medical devices in accordance with IEC 62366.

## 2. Scope
This SOP applies to all usability testing conducted for medical devices developed or modified by the organization.

## 3. Responsibilities
- Usability Engineering Lead: Responsible for overall planning and execution of usability testing
- Test Facilitators: Responsible for conducting usability test sessions
- Data Analysts: Responsible for analyzing usability test data
- Quality Assurance: Responsible for ensuring compliance with regulatory requirements

## 4. Definitions
- Usability: The characteristics of the user interface that establish effectiveness, efficiency, ease of user learning, and user satisfaction
- Use Error: User action or lack of action that leads to a different result than intended by the manufacturer or expected by the user
- User Interface: All components of a medical device with which a user interacts
- Formative Evaluation: Iterative testing conducted during development to identify usability problems
- Summative Evaluation: Final validation testing to demonstrate that the device can be used safely and effectively

## 5. Procedure

### 5.1 Test Planning
1. Define test objectives and research questions
2. Identify user groups for testing based on the intended users
3. Determine the number of participants needed
4. Select appropriate testing methods (e.g., think-aloud, observation, interview)
5. Develop test scenarios and tasks based on the user requirements and risk analysis
6. Prepare data collection instruments (e.g., questionnaires, rating scales)
7. Establish evaluation criteria and metrics
8. Create a test plan document that includes all the above elements

### 5.2 Participant Recruitment
1. Develop screening criteria based on the identified user groups
2. Create recruitment materials
3. Screen potential participants against criteria
4. Schedule participants for testing sessions
5. Prepare and obtain informed consent forms
6. Provide participants with necessary pre-test information

### 5.3 Test Environment Setup
1. Arrange testing facility to simulate the intended use environment
2. Prepare test device or prototype
3. Set up recording equipment (video, audio)
4. Prepare observer area if applicable
5. Conduct a pilot test to verify setup and procedures

### 5.4 Test Execution
1. Welcome participant and explain session procedures
2. Obtain informed consent
3. Collect demographic information
4. Provide any necessary training (as defined in the test plan)
5. Present test scenarios and tasks to participant
6. Observe and record participant behaviors and comments
7. Note any use errors, close calls, or difficulties
8. Administer post-task questionnaires
9. Conduct post-test interview
10. Thank participant and provide compensation if applicable

### 5.5 Data Analysis
1. Compile all data collected (observations, recordings, questionnaires)
2. Identify and categorize usability issues
3. Assess severity of issues based on established criteria
4. Analyze task performance metrics (e.g., time on task, success rate)
5. Analyze subjective feedback
6. Document findings in accordance with documentation requirements

### 5.6 Reporting
1. Prepare a usability test report that includes:
   - Executive summary
   - Test objectives
   - Methodology
   - Participant demographics
   - Results and findings
   - Analysis of use-related hazards
   - Recommendations for design improvements
   - Conclusions
2. Present findings to the development team
3. Archive all test materials and data

## 6. Documentation
The following documentation shall be maintained:
- Usability test plan
- Participant screening and recruitment records
- Informed consent forms
- Raw test data (recordings, notes, questionnaires)
- Data analysis documents
- Usability test report

## 7. Training
All personnel involved in usability testing shall be trained on this SOP and their specific responsibilities.

## 8. References
- IEC 62366-1: Medical devices - Application of usability engineering to medical devices
- FDA Guidance: Applying Human Factors and Usability Engineering to Medical Devices
- ISO 14971: Medical devices — Application of risk management to medical devices

## 9. Attachments
- Attachment A: Usability Test Plan Template
- Attachment B: Informed Consent Form Template
- Attachment C: Usability Test Report Template

## 10. Revision History
- Version 1.0: Initial release (2023-07-10)`,
      description: "Detailed procedure for conducting usability testing of medical devices per IEC 62366"
    },
    {
      id: "DOC-006",
      title: "Equipment Calibration Form",
      type: "Form",
      status: "Approved",
      project: "Nanomaterial Research",
      qmsType: "ISO 9001",
      updatedAt: "2023-08-30",
      author: "Dr. Michael Brown",
      version: "1.1",
      content: `# Equipment Calibration Form

## 1. Equipment Information
- Equipment Name: [EQUIPMENT NAME]
- Model Number: [MODEL NUMBER]
- Serial Number: [SERIAL NUMBER]
- Asset ID: [ASSET ID]
- Location: [LOCATION]
- Department: [DEPARTMENT]

## 2. Calibration Information
- Calibration Date: [DATE]
- Calibration Due Date: [DATE]
- Calibration Type: [ ] Initial [ ] Routine [ ] After Repair [ ] Other: ________________
- Calibration Method: [ ] In-house [ ] External
- Calibration Procedure Reference: [PROCEDURE ID/NAME]
- Environmental Conditions:
  - Temperature: [TEMPERATURE] ± [TOLERANCE] °C
  - Humidity: [HUMIDITY] ± [TOLERANCE] %RH
  - Other: [SPECIFY]

## 3. Calibration Standards Used

| Standard Name | ID Number | Calibration Due Date | Traceability |
|---------------|-----------|----------------------|-------------|
| [STANDARD]    | [ID]      | [DATE]               | [REFERENCE] |
| [STANDARD]    | [ID]      | [DATE]               | [REFERENCE] |

## 4. Calibration Results

| Parameter | Nominal Value | Acceptable Range | Measured Value | Pass/Fail | Comments |
|-----------|---------------|------------------|----------------|-----------|----------|
| [PARAMETER] | [VALUE]     | [RANGE]          | [VALUE]        | [ ] Pass [ ] Fail | [COMMENTS] |
| [PARAMETER] | [VALUE]     | [RANGE]          | [VALUE]        | [ ] Pass [ ] Fail | [COMMENTS] |
| [PARAMETER] | [VALUE]     | [RANGE]          | [VALUE]        | [ ] Pass [ ] Fail | [COMMENTS] |
| [PARAMETER] | [VALUE]     | [RANGE]          | [VALUE]        | [ ] Pass [ ] Fail | [COMMENTS] |

## 5. Calibration Outcome
- Overall Result: [ ] Pass [ ] Fail [ ] Limited Use (see comments)
- Adjustment Required: [ ] Yes [ ] No
- If adjusted, describe actions taken:
  [DESCRIPTION OF ADJUSTMENTS]

- Calibration Label Applied: [ ] Yes [ ] No
- New Calibration Label Information:
  - Calibration Date: [DATE]
  - Calibration Due Date: [DATE]
  - Performed By: [NAME]
  - Equipment ID: [ID]

## 6. Comments and Observations
[COMMENTS AND OBSERVATIONS]

## 7. Approval
- Calibration Performed By:
  - Name: [NAME]
  - Signature: ____________________
  - Date: [DATE]

- Reviewed By:
  - Name: [NAME]
  - Signature: ____________________
  - Date: [DATE]

- Customer Notification (if applicable):
  - Name: [NAME]
  - Notification Date: [DATE]
  - Notification Method: [ ] Email [ ] Phone [ ] In-person [ ] Other: ________________

## 8. Attachments
- [ ] Calibration Certificate
- [ ] Raw Data
- [ ] Before/After Pictures
- [ ] Other: ________________

## 9. For Non-Conforming Equipment
- Non-Conformance Report Number: [NCR NUMBER]
- Action Taken:
  [ ] Equipment Removed from Service
  [ ] Limited Use with Restrictions
  [ ] Repair Required
  [ ] Other: ________________

- Description of Limitations/Restrictions:
  [DESCRIPTION]

## 10. Follow-up Actions
- Follow-up Required: [ ] Yes [ ] No
- If yes, describe required actions:
  [DESCRIPTION OF REQUIRED ACTIONS]

- Follow-up Completion Date: [DATE]
- Verified By: [NAME]`,
      description: "Form for documenting equipment calibration activities and results"
    }
  ]);
  
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"title" | "updatedAt" | "status">("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // State for dialogs
  const [showViewDocumentDialog, setShowViewDocumentDialog] = useState(false);
  const [showEditDocumentDialog, setShowEditDocumentDialog] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  
  // Get unique document types, statuses, etc. for filtering
  const documentTypes = Array.from(new Set(documents.map(doc => doc.type)));
  const documentStatuses = Array.from(new Set(documents.map(doc => doc.status)));
  const projectNames = Array.from(new Set(documents.map(doc => doc.project)));
  const qmsTypes = Array.from(new Set(documents.map(doc => doc.qmsType)));
  
  // Filter documents based on search term, type, and status
  let filteredDocuments = documents.filter(doc => 
    (searchTerm === "" || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.qmsType.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === null || doc.type === typeFilter) &&
    (statusFilter === null || doc.status === statusFilter)
  );
  
  // Sort documents
  filteredDocuments = filteredDocuments.sort((a, b) => {
    if (sortBy === "title") {
      return sortDirection === "asc" 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title);
    } else if (sortBy === "updatedAt") {
      return sortDirection === "asc" 
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime() 
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortBy === "status") {
      return sortDirection === "asc" 
        ? a.status.localeCompare(b.status) 
        : b.status.localeCompare(a.status);
    }
    return 0;
  });
  
  // Toggle sort direction and update sort field
  const handleSort = (field: "title" | "updatedAt" | "status") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  // Create a new document
  const handleCreateDocument = (newDocument: NewDocument) => {
    const newDoc: Document = {
      id: `DOC-${String(documents.length + 1).padStart(3, '0')}`,
      title: newDocument.title,
      type: newDocument.type as any,
      status: "Draft",
      project: newDocument.project,
      qmsType: newDocument.qmsType,
      updatedAt: new Date().toISOString().split('T')[0],
      author: "Current User",
      version: "0.1",
      content: newDocument.content,
      description: newDocument.description
    };

    setDocuments([newDoc, ...documents]);
    toast.success("Document has been created");
  };

  // View document details
  const handleViewDocument = (doc: Document) => {
    setCurrentDocument(doc);
    setShowViewDocumentDialog(true);
  };

  // Edit document
  const handleEditDocument = (doc: Document) => {
    setCurrentDocument(doc);
    setShowEditDocumentDialog(true);
  };

  // Save edited document
  const handleSaveEditedDocument = (editedDocument: Document) => {
    setDocuments(documents.map(doc => 
      doc.id === editedDocument.id 
        ? {...editedDocument, updatedAt: new Date().toISOString().split('T')[0]} 
        : doc
    ));
    
    toast.success("Document has been updated");
  };

  // Delete document
  const handleDeleteDocument = (doc: Document) => {
    toast.info(
      <div className="flex flex-col gap-2">
        <p>Are you sure you want to delete "{doc.title}"?</p>
        <div className="flex justify-end gap-2">
          <button 
            className="px-3 py-1.5 bg-gray-100 rounded text-sm"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
          <button 
            className="px-3 py-1.5 bg-red-600 text-white rounded text-sm"
            onClick={() => {
              setDocuments(documents.filter(d => d.id !== doc.id));
              toast.success("Document has been deleted");
            }}
          >
            Delete
          </button>
        </div>
      </div>,
      {
        duration: 5000,
      }
    );
  };

  // Change document status
  const handleChangeStatus = (doc: Document, newStatus: "Draft" | "In Review" | "Approved" | "Obsolete") => {
    setDocuments(
      documents.map(d => 
        d.id === doc.id 
          ? { ...d, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } 
          : d
      )
    );
    
    const statusMessages = {
      Draft: "saved as draft",
      "In Review": "set to review",
      Approved: "approved",
      Obsolete: "marked as obsolete"
    };
    
    toast.success(`Document has been ${statusMessages[newStatus]}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Manage your quality management system documentation
          </p>
        </div>
        
        <CreateDocumentDialog 
          onCreateDocument={handleCreateDocument}
          projectNames={projectNames}
          qmsTypes={qmsTypes}
        />
      </div>
      
      <DocumentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSort}
        documentTypes={documentTypes}
        documentStatuses={documentStatuses}
      />
      
      <DocumentTabs
        filteredDocuments={filteredDocuments}
        onView={handleViewDocument}
        onEdit={handleEditDocument}
        onDelete={handleDeleteDocument}
        onChangeStatus={handleChangeStatus}
      />

      <DocumentViewDialog
        document={currentDocument}
        open={showViewDocumentDialog}
        onOpenChange={setShowViewDocumentDialog}
        onEdit={handleEditDocument}
      />

      <DocumentEditDialog
        document={currentDocument}
        open={showEditDocumentDialog}
        onOpenChange={setShowEditDocumentDialog}
        onSave={handleSaveEditedDocument}
        projectNames={projectNames}
      />
    </div>
  );
};

export default Documents;
