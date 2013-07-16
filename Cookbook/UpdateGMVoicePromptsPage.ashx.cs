using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Cookbook
{
    /// <summary>
    /// Summary description for UpdateGMVoicePromptsPage
    /// </summary>
    public class UpdateGMVoicePromptsPage : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<GMVoicePromptDetail> q = db.GMVoicePromptDetails;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                GMVoicePromptDetail record = new GMVoicePromptDetail();

                if (db.GMVoicePromptDetails.Count(a => a.project_id.Equals(int.Parse(filter)) && a.language.Equals((String)blob["viewPromptsLangTwoLanguage"])) > 0)
                {
                    record = db.GMVoicePromptDetails.Single(a => a.project_id.Equals(int.Parse(filter)) && a.language.Equals((String)blob["viewPromptsLangTwoLanguage"]));

                    //record.cd_fee = (String)blob["viewPromptsLangOneCDFee"];
                    record.cd_mailing_address = (String)blob["viewPromptsLangTwoCDMailingAddress"];

                    if (blob["viewPromptsLangTwoCDRequired"] != null) { record.cd_required = (((String)blob["viewPromptsLangTwoCDRequired"]) == "on" ? true : false); }
                    else { record.cd_required = false; }


                    if (((String)blob["viewPromptsLangTwoConversionSessions"]).Equals(""))
                    {
                        record.conversion_sessions = 0;
                    }
                    else
                    {
                        record.conversion_sessions = int.Parse((String)blob["viewPromptsLangTwoConversionSessions"]);
                    }

                    record.converted_prompt_format = (String)blob["viewPromptsLangTwoConvertedPromptFormat"];

                    record.language = (String)blob["viewPromptsLangTwoLanguage"];

                    if (blob["viewPromptsLangTwoMinimumFee"] != null) { record.min_fee = (((String)blob["viewPromptsLangTwoMinimumFee"]) == "on" ? true : false); }
                    else { record.min_fee = false; }

                    if (((String)blob["viewPromptsLangTwoNumWords"]).Equals(""))
                    {
                        record.num_words = 0;
                    }
                    else
                    {
                        record.num_words = int.Parse((String)blob["viewPromptsLangTwoNumWords"]);
                    }

                    record.order_type = (String)blob["viewPromptsLangTwoOrderType"];

                    record.prompt_format = (String)blob["viewPromptsLangTwoPromptFormat"];

                    if (((String)blob["viewPromptsLangTwoPromptsProvidedByCustomer"]).Equals(""))
                    {
                        record.prompts_provided = 0;
                    }
                    else
                    {
                        record.prompts_provided = int.Parse((String)blob["viewPromptsLangTwoPromptsProvidedByCustomer"]);
                    }

                    if (((String)blob["viewPromptsLangTwoPromptsToBeBilled"]).Equals(""))
                    {
                        record.prompts_billed = 0;
                    }
                    else
                    {
                        record.prompts_billed = int.Parse((String)blob["viewPromptsLangTwoPromptsToBeBilled"]);
                    }

                    if (((String)blob["viewPromptsLangTwoPromptsToBeConverted"]).Equals(""))
                    {
                        record.prompts_converted = 0;
                    }
                    else
                    {
                        record.prompts_converted = int.Parse((String)blob["viewPromptsLangTwoPromptsToBeConverted"]);
                    }

                    if (((String)blob["viewPromptsLangTwoPromptsToBeDigitized"]).Equals(""))
                    {
                        record.prompts_digitized = 0;
                    }
                    else
                    {
                        record.prompts_digitized = int.Parse((String)blob["viewPromptsLangTwoPromptsToBeDigitized"]);
                    }

                    if (((String)blob["viewPromptsLangTwoPromptsToBeRecorded"]).Equals(""))
                    {
                        record.prompts_recorded = 0;
                    }
                    else
                    {
                        record.prompts_recorded = int.Parse((String)blob["viewPromptsLangTwoPromptsToBeRecorded"]);
                    }

                    if (((String)blob["viewPromptsLangTwoRecordingSessions"]).Equals(""))
                    {
                        record.recording_sessions = 0;
                    }
                    else
                    {
                        record.recording_sessions = int.Parse((String)blob["viewPromptsLangTwoRecordingSessions"]);
                    }

                    record.recording_studio = (String)blob["viewPromptsLangTwoRecordingStudio"];

                    record.setup_fee = (String)blob["viewPromptsLangTwoSetupFee"];
                    record.recording1_fee = (String)blob["viewPromptsLangTwoPromptFee"];
                    record.recording3_fee = (String)blob["viewPromptsLangTwoConversionSetupFee"];
                    record.translation_fee = (String)blob["viewPromptsLangTwoConversionPromptFee"];
                    record.delivery_fee = (String)blob["viewPromptsLangTwoTranslationFeeMinimum"];
                    record.total_recording_fee = (String)blob["viewPromptsLangTwoTotalRecordingFee"];

                    if (blob["viewPromptsLangTwoTransferFeeRequired"] != null) { record.fee_required = (((String)blob["viewPromptsLangTwoTransferFeeRequired"]) == "on" ? true : false); }
                    else { record.fee_required = false; }


                    if (blob["viewPromptsLangTwoTranslationNeedsApproval"] != null) { record.needs_approval = (((String)blob["viewPromptsLangTwoTranslationNeedsApproval"]) == "on" ? true : false); }
                    else { record.needs_approval = false; }

                    db.SubmitChanges();

                    return new PagedData("project_id(" + filter + ") and language(" + (String)blob["viewPromptsLangTwoLanguage"] + ") modified");
                }

                record = new GMVoicePromptDetail();
                record.project_id = int.Parse(filter);  //kinda important
                //record.cd_fee = (String)blob["viewPromptsLangTwoCdFee"];
                record.cd_mailing_address = (String)blob["viewPromptsLangTwoCDMailingAddress"];

                if (blob["viewPromptsLangTwoCDRequired"] != null) { record.cd_required = (((String)blob["viewPromptsLangTwoCDRequired"]) == "on" ? true : false); }

                if (((String)blob["viewPromptsLangTwoConversionSessions"]).Equals(""))
                {
                    record.conversion_sessions = 0;
                }
                else
                {
                    record.conversion_sessions = int.Parse((String)blob["viewPromptsLangTwoConversionSessions"]);
                }

                record.converted_prompt_format = (String)blob["viewPromptsLangTwoConvertedPromptFormat"];
  
                record.language = (String)blob["viewPromptsLangTwoLanguage"];

                if (blob["viewPromptsLangTwoMinimumFee"] != null) { record.min_fee = (((String)blob["viewPromptsLangTwoMinimumFee"]) == "on" ? true : false); }

                if (((String)blob["viewPromptsLangTwoNumWords"]).Equals(""))
                {
                    record.num_words = 0;
                }
                else
                {
                    record.num_words = int.Parse((String)blob["viewPromptsLangTwoNumWords"]);
                }

                record.order_type = (String)blob["viewPromptsLangTwoOrderType"];
                record.prompt_format = (String)blob["viewPromptsLangTwoPromptFormat"];

                if (((String)blob["viewPromptsLangTwoPromptsProvidedByCustomer"]).Equals(""))
                {
                    record.prompts_provided = 0;
                }
                else
                {
                    record.prompts_provided = int.Parse((String)blob["viewPromptsLangTwoPromptsProvidedByCustomer"]);
                }

                if (((String)blob["viewPromptsLangTwoPromptsToBeBilled"]).Equals(""))
                {
                    record.prompts_billed = 0;
                }
                else
                {
                    record.prompts_billed = int.Parse((String)blob["viewPromptsLangTwoPromptsToBeBilled"]);
                }

                if (((String)blob["viewPromptsLangTwoPromptsToBeConverted"]).Equals(""))
                {
                    record.prompts_converted = 0;
                }
                else
                {
                    record.prompts_converted = int.Parse((String)blob["viewPromptsLangTwoPromptsToBeConverted"]);
                }

                if (((String)blob["viewPromptsLangTwoPromptsToBeDigitized"]).Equals(""))
                {
                    record.prompts_digitized = 0;
                }
                else
                {
                    record.prompts_digitized = int.Parse((String)blob["viewPromptsLangTwoPromptsToBeDigitized"]);
                }

                if (((String)blob["viewPromptsLangTwoPromptsToBeRecorded"]).Equals(""))
                {
                    record.prompts_recorded = 0;
                }
                else
                {
                    record.prompts_recorded = int.Parse((String)blob["viewPromptsLangTwoPromptsToBeRecorded"]);
                }

                if (((String)blob["viewPromptsLangTwoRecordingSessions"]).Equals(""))
                {
                    record.recording_sessions = 0;
                }
                else
                {
                    record.recording_sessions = int.Parse((String)blob["viewPromptsLangTwoRecordingSessions"]);
                }

                record.recording_studio = (String)blob["viewPromptsLangTwoRecordingStudio"];
                record.setup_fee = (String)blob["viewPromptsLangTwoSetupFee"];
                record.recording1_fee = (String)blob["viewPromptsLangTwoPromptFee"];
                record.recording3_fee = (String)blob["viewPromptsLangTwoConversionSetupFee"];
                record.translation_fee = (String)blob["viewPromptsLangTwoConversionPromptFee"];
                record.delivery_fee = (String)blob["viewPromptsLangTwoTranslationFeeMinimum"];
                record.total_recording_fee = (String)blob["viewPromptsLangTwoTotalRecordingFee"];

                if (blob["viewPromptsLangTwoTransferFeeRequired"] != null) { record.fee_required = (((String)blob["viewPromptsLangTwoTransferFeeRequired"]) == "on" ? true : false); }

                if (blob["viewPromptsLangTwoTranslationNeedsApproval"] != null) { record.needs_approval = (((String)blob["viewPromptsLangTwoTranslationNeedsApproval"]) == "on" ? true : false); }

                db.GMVoicePromptDetails.InsertOnSubmit(record);
                db.SubmitChanges();

                return new PagedData("project_id(" + filter + ") and language(" + (String)blob["viewPromptsLangTwoLanguage"] + ") added");
            }

            return new PagedData("UpdateGMVoicePromptsPage.ashx requires a project_id");
        }
    }
}