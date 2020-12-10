import * as vscode from 'vscode';

interface Grade {
  value: number;
  max: number;
}

export interface Grades {
  datavalidation: Grade;
  security: Grade;
  oasconformance: Grade;
  all: number;
  errors: boolean;
  invalid: boolean;
}

export interface ReportedIssue {
  id: string;
  description: string;
  pointer: string;
  score: number;
  displayScore: string;
  criticality: number;
}

export interface Issue extends ReportedIssue {
  lineNo: number;
  range: vscode.Range;
  documentUri: string;
}

export interface IssuesByDocument {
  [uri: string]: Issue[];
}

export interface IssuesByType {
  [id: string]: Issue[];
}

export interface Summary extends Grades {
  documentUri: string;
  subdocumentUris: string[];
}

export interface Audit {
  summary: Summary;
  issues: IssuesByDocument;
  issuesByType: IssuesByType;
  diagnostics: vscode.DiagnosticCollection;
  decorations: { [documentUri: string]: vscode.DecorationOptions[] };
}

export interface AuditContext {
  [uri: string]: Audit;
}
