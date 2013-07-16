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
    /// Summary description for UpdatePromptsPage
    /// </summary>
    public class UpdatePromptsPage : DatabaseHandler
    {

        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            IQueryable<PromptDetail> q = db.PromptDetails;

            System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);

            var jsonSerializer = new JsonSerializer();
            JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));

            string filter = context.Request.Params.Get("project_id");
            if (!isNull(filter))
            {
                PromptDetail record = new PromptDetail();

                if (db.PromptDetails.Count(a => a.project_id.Equals(int.Parse(filter)) && a.language.Equals((String)blob["viewPromptsLangOneLanguage"])) > 0)
                {
                    record = db.PromptDetails.Single(a => a.project_id.Equals(int.Parse(filter)) && a.language.Equals((String)blob["viewPromptsLangOneLanguage"]));

                    //record.cd_fee = (String)blob["viewPromptsLangOneCDFee"];
                    record.cd_mailing_address = (String)blob["viewPromptsLangOneCDMailingAddress"];

                    if (blob["viewPromptsLangOneCDRequired"] != null) { record.cd_required = (((String)blob["viewPromptsLangOneCDRequired"]) == "on" ? true : false); }
                    else { record.cd_required = false; }
                    
                    record.conversion_prompt_fee = (String)blob["viewPromptsLangOneConversionPromptFee"];
                    
                    if (((String)blob["viewPromptsLangOneConversionSessions"]).Equals(""))
                    {
                        record.conversion_sessions = 0;
                    }
                    else
                    {
                        record.conversion_sessions = int.Parse((String)blob["viewPromptsLangOneConversionSessions"]);
                    }
                    record.conversion_setup_fee = (String)blob["viewPromptsLangOneConversionSetupFee"];
                    record.converted_prompt_format = (String)blob["viewPromptsLangOneConvertedPromptFormat"];
                    record.fee_formula = (String)blob["viewPromptsLangOneFeeFormula"];
                    record.language = (String)blob["viewPromptsLangOneLanguage"];

                    if (blob["viewPromptsLangOneMinimumFee"] != null) { record.min_fee = (((String)blob["viewPromptsLangOneMinimumFee"]) == "on" ? true : false); }
                    else { record.min_fee = false; }

                    if (((String)blob["viewPromptsLangOneNumWords"]).Equals(""))
                    {
                        record.num_words = 0;
                    }
                    else
                    {
                        record.num_words = int.Parse((String)blob["viewPromptsLangOneNumWords"]);
                    }

                    record.order_type = (String)blob["viewPromptsLangOneOrderType"];
                    record.prompt_fee = (String)blob["viewPromptsLangOnePromptFee"];
                    record.prompt_format = (String)blob["viewPromptsLangOnePromptFormat"];

                    if (((String)blob["viewPromptsLangOnePromptsProvidedByCustomer"]).Equals(""))
                    {
                        record.prompts_provided = 0;
                    }
                    else
                    {
                        record.prompts_provided = int.Parse((String)blob["viewPromptsLangOnePromptsProvidedByCustomer"]);
                    }

                    if (((String)blob["viewPromptsLangOnePromptsToBeBilled"]).Equals(""))
                    {
                        record.prompts_billed = 0;
                    }
                    else
                    {
                        record.prompts_billed = int.Parse((String)blob["viewPromptsLangOnePromptsToBeBilled"]);
                    }

                    if (((String)blob["viewPromptsLangOnePromptsToBeConverted"]).Equals(""))
                    {
                        record.prompts_converted = 0;
                    }
                    else
                    {
                        record.prompts_converted = int.Parse((String)blob["viewPromptsLangOnePromptsToBeConverted"]);
                    }

                    if (((String)blob["viewPromptsLangOnePromptsToBeDigitized"]).Equals(""))
                    {
                        record.prompts_digitized = 0;
                    }
                    else
                    {
                        record.prompts_digitized = int.Parse((String)blob["viewPromptsLangOnePromptsToBeDigitized"]);
                    }

                    if (((String)blob["viewPromptsLangOnePromptsToBeRecorded"]).Equals(""))
                    {
                        record.prompts_recorded = 0;
                    }
                    else
                    {
                        record.prompts_recorded = int.Parse((String)blob["viewPromptsLangOnePromptsToBeRecorded"]);
                    }

                    if (((String)blob["viewPromptsLangOneRecordingSessions"]).Equals(""))
                    {
                        record.recording_sessions = 0;
                    }
                    else
                    {
                        record.recording_sessions = int.Parse((String)blob["viewPromptsLangOneRecordingSessions"]);
                    }

                    record.recording_studio = (String)blob["viewPromptsLangOneRecordingStudio"];
                    record.setup_fee = (String)blob["viewPromptsLangOneSetupFee"];
                    record.total_recording_fee = (String)blob["viewPromptsLangOneTotalRecordingFee"];
                    record.transfer_fee = (String)blob["viewPromptsLangOneTransferFee"];

                    if (blob["viewPromptsLangOneTransferFeeRequired"] != null) { record.fee_required = (((String)blob["viewPromptsLangOneTransferFeeRequired"]) == "on" ? true : false); }
                    else { record.fee_required = false; }
                    
                    record.fee_min = (String)blob["viewPromptsLangOneTranslationFeeMinimum"];
                    record.fee_per_word = (String)blob["viewPromptsLangOneTranslationFeePerWord"];

                    if (blob["viewPromptsLangOneTranslationNeedsApproval"] != null) { record.needs_approval = (((String)blob["viewPromptsLangOneTranslationNeedsApproval"]) == "on" ? true : false); }
                    else { record.needs_approval = false; }

                    db.SubmitChanges();

                    return new PagedData("project_id(" + filter + ") and language(" + (String)blob["viewPromptsLangOneLanguage"] + ") modified");
                }

                record = new PromptDetail();
                record.project_id = int.Parse(filter);  //kinda important
                //record.cd_fee = (String)blob["viewPromptsLangOneCdFee"];
                record.cd_mailing_address = (String)blob["viewPromptsLangOneCDMailingAddress"];
                
                if (blob["viewPromptsLangOneCDRequired"] != null) { record.cd_required = (((String)blob["viewPromptsLangOneCDRequired"]) == "on" ? true : false); }
                
                record.conversion_prompt_fee = (String)blob["viewPromptsLangOneConversionPromptFee"];

                if (((String)blob["viewPromptsLangOneConversionSessions"]).Equals(""))
                {
                    record.conversion_sessions = 0;
                }
                else
                {
                    record.conversion_sessions = int.Parse((String)blob["viewPromptsLangOneConversionSessions"]);
                }

                record.conversion_setup_fee = (String)blob["viewPromptsLangOneConversionSetupFee"];
                record.converted_prompt_format = (String)blob["viewPromptsLangOneConvertedPromptFormat"];
                record.fee_formula = (String)blob["viewPromptsLangOneFeeFormula"];
                record.language = (String)blob["viewPromptsLangOneLanguage"];
                
                if (blob["viewPromptsLangOneMinimumFee"] != null) { record.min_fee = (((String)blob["viewPromptsLangOneMinimumFee"]) == "on" ? true : false); }

                if (((String)blob["viewPromptsLangOneNumWords"]).Equals(""))
                {
                    record.num_words = 0;
                }
                else
                {
                    record.num_words = int.Parse((String)blob["viewPromptsLangOneNumWords"]);
                }

                record.order_type = (String)blob["viewPromptsLangOneOrderType"];
                record.prompt_fee = (String)blob["viewPromptsLangOnePromptFee"];
                record.prompt_format = (String)blob["viewPromptsLangOnePromptFormat"];

                if (((String)blob["viewPromptsLangOnePromptsProvidedByCustomer"]).Equals(""))
                {
                    record.prompts_provided = 0;
                }
                else
                {
                    record.prompts_provided = int.Parse((String)blob["viewPromptsLangOnePromptsProvidedByCustomer"]);
                }

                if (((String)blob["viewPromptsLangOnePromptsToBeBilled"]).Equals(""))
                {
                    record.prompts_billed = 0;
                }
                else
                {
                    record.prompts_billed = int.Parse((String)blob["viewPromptsLangOnePromptsToBeBilled"]);
                }

                if (((String)blob["viewPromptsLangOnePromptsToBeConverted"]).Equals(""))
                {
                    record.prompts_converted = 0;
                }
                else
                {
                    record.prompts_converted = int.Parse((String)blob["viewPromptsLangOnePromptsToBeConverted"]);
                }

                if (((String)blob["viewPromptsLangOnePromptsToBeDigitized"]).Equals(""))
                {
                    record.prompts_digitized = 0;
                }
                else
                {
                    record.prompts_digitized = int.Parse((String)blob["viewPromptsLangOnePromptsToBeDigitized"]);
                }

                if (((String)blob["viewPromptsLangOnePromptsToBeRecorded"]).Equals(""))
                {
                    record.prompts_recorded = 0;
                }
                else
                {
                    record.prompts_recorded = int.Parse((String)blob["viewPromptsLangOnePromptsToBeRecorded"]);
                }

                if (((String)blob["viewPromptsLangOneRecordingSessions"]).Equals(""))
                {
                    record.recording_sessions = 0;
                }
                else
                {
                    record.recording_sessions = int.Parse((String)blob["viewPromptsLangOneRecordingSessions"]);
                }

                record.recording_studio = (String)blob["viewPromptsLangOneRecordingStudio"];
                record.setup_fee = (String)blob["viewPromptsLangOneSetupFee"];
                record.total_recording_fee = (String)blob["viewPromptsLangOneTotalRecordingFee"];
                record.transfer_fee = (String)blob["viewPromptsLangOneTransferFee"];
                
                if (blob["viewPromptsLangOneTransferFeeRequired"] != null) { record.fee_required = (((String)blob["viewPromptsLangOneTransferFeeRequired"]) == "on" ? true : false); }
                
                record.fee_min = (String)blob["viewPromptsLangOneTranslationFeeMinimum"];
                record.fee_per_word = (String)blob["viewPromptsLangOneTranslationFeePerWord"];
                
                if (blob["viewPromptsLangOneTranslationNeedsApproval"] != null) { record.needs_approval = (((String)blob["viewPromptsLangOneTranslationNeedsApproval"]) == "on" ? true : false); }

                db.PromptDetails.InsertOnSubmit(record);
                db.SubmitChanges();

                return new PagedData("project_id(" + filter + ") and language(" + (String)blob["viewPromptsLangOneLanguage"] + ") added");
            }

            return new PagedData("UpdatePromptsPage.ashx requires a project_id");
        }
    }
}