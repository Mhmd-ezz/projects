using System;
using Etl.Processes.Common;
using Etl.Processes.PatientOperations;
using Etl.Processes.ConsultationOperations;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Operations;
using Rhino.Etl.Core.Pipelines;
using Etl.Processes.ImagesOperations;

namespace Etl.Processes
{
    public class ImagesProcess : EtlProcess
    {
        public ImagesProcess()
        {
            PipelineExecuter = new SingleThreadedPipelineExecuter();
        }
        protected override void Initialize()
        {
            Register(new JoinPatientsImages()
                .Left(new JoinImages()
                    .Left(Partial
                            .Register(new ReadSourceImages())
                            .Register(new CreateSourceImagesKey())
                            .Register(new CreateSourcePatientsKey()))
                    .Right(
                        Partial
                            .Register(new ReadTargetImages())
                            .Register(new CreateTargetImagesKey()))
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
                        .Register(new InsertNewImages())
                    )

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
