using Medcilia.Clinic.Common.Enumerations;
using System;
using System.Collections.Generic;
using System.Text;


namespace Media.Enums
{
    public class FileSystemTagsEnum : LocalizedKeyedEnumeration
    {
        public static FileSystemTagsEnum NotSet = new FileSystemTagsEnum(-1, "", "Not Set", "غير محدد");
        public static FileSystemTagsEnum GeneralSpeciality = new FileSystemTagsEnum(10, "general", "general", "أ+");
        public static FileSystemTagsEnum Condition = new FileSystemTagsEnum(20, "condition", "condition", "أ-");
        public static FileSystemTagsEnum Followup = new FileSystemTagsEnum(30, "followup", "followup", "ب+");
        public static FileSystemTagsEnum Operation = new FileSystemTagsEnum(40, "operation", "operation", "ب-");
        public static FileSystemTagsEnum PhysicalExam = new FileSystemTagsEnum(50, "physicalExam", "physicalExam", "أب+");
        public static FileSystemTagsEnum Radio = new FileSystemTagsEnum(60, "radio", "radio", "اب-");
        public static FileSystemTagsEnum Laboratory = new FileSystemTagsEnum(70, "laboratory", "laboratory", "و+");

        public FileSystemTagsEnum()
        {
        }

        public FileSystemTagsEnum(int value, string displayName)
            : base(value, displayName)
        {
        }

        public FileSystemTagsEnum(int value, string key, params string[] displayNames)
            : base(value, key, displayNames)
        {
        }

        protected override void SetCultures()
        {
            _supportedCultures = new[] { "en", "ar" };
        }
    }
}
