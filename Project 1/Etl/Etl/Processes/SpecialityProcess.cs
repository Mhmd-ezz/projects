using System;
using Etl.Processes.Common;
using Etl.Processes.PatientOperations;
using Etl.Processes.ConsultationOperations;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using Rhino.Etl.Core.Pipelines;
using Etl.Processes.FollowupOperations;

namespace Etl.Processes
{
    public class SpecialityProcess : EtlProcess
    {
        public SpecialityProcess()
        {
            PipelineExecuter = new SingleThreadedPipelineExecuter();
        }
        protected override void Initialize()
        {
            Register(new JoinPatients()
                .Left(new JoinConsultations()
                        .Left(
                            Partial
                                .Register(new ReadSourcePatients())
                                .Register(new CreateSourcePatientsKey()))
                        .Right(new JoinConsultationsFollowups()
                            .Left(
                                Partial
                                    .Register(new ReadSourceConsultations())
                                    // .Register(new CreateSourceConsultationsKey())
                                )
                                .Right(
                                   Partial
                                    .Register(new ReadSourceFollowups())
                                )                            
                            )
                        )
                .Right(
                    Partial
                        .Register(new ReadTargetPatients())
                        .Register(new CreateTargetPatientsKey())
                )
                );

            Register(new TransformPatients());

            Register(
                new BranchingOperation()
                    .Add(Partial
                        .Register(new Filter { Action = "insert" })
                        .Register(new InsertNewPatients())
                    )
                    .Add(Partial
                        .Register(new Filter { Action = "update" })
                        .Register(new UpdateExistingPatients()))
            );

        }

        protected override void PostProcessing()
        {
            base.PostProcessing();

            if (!PipelineExecuter.HasErrors)
                Info("Process completed successfully");
            else
            {
                Warn("Process failed");
                foreach (var error in GetAllErrors())
                {
                    Console.WriteLine(error.Message);
                }
#if !DEBUG
                throw new Exception("Process failed");
#endif
            }
        }
    }

}
