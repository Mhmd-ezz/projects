export interface IDashboard {
    stats: IStats;
    // inprogressStats: IInprogressStats;
    // tasksStats: ITasksStats;
    usersTasks: any[];
    demos: any[];
    toBeDelivered: any[];

}
export interface IStats {
    inprogress: string;
    nextTenDays: string;
    overDue: string;
    unassigned: string | number;

    yearlyInprogress: string;
    yearlySubmitted: string;
    yearlyPending: string;
    yearlyLost: string;
    yearlyWon: string;
    yearlyCancelled: string;
    yearlyProposal: string;
    yearlyDemo: string;
    yearlyRfpWriting: string;
    yearlyPresentation: string;
}

export interface ITasksStats {
    dueTasks: string;
    highPriorityTasks: string;
    overDueTasks: string;
    completed: string;
    completedTodayTasks: string;
    toDeliverTodayTasks: string;
    unassignedTasks: string;
    assignedTasks: string;
}
