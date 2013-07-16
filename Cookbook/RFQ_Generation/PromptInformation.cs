using System;

namespace Cookbook
{
    /// <summary>
    /// Summary description for Class1
    /// </summary>
    public class PromptInformation
    {
        private static string BAD_LANGUAGE = "English"; // bad because it is cheaper to deal with
        public string Language;
        public string CTGNumber;
        public bool WaveFormat;
        public bool AltFormat;
        public bool CDRequired;
        public bool TranslationRequired;
        public string CDMailingAddress;
        public string RecordingStudio;
        public string OrderType;
        public string ConvertedFormat;
        public string DeliveryMethod;
        public int RecordingSessions;
        public int ConversionSessions;
        public int PromptsToRecord;
        public int PromptsBilled;
        public int PromptsProvided;
        public int PromptsConverted;
        public int PromptsToTranslate;
        public int WordsToTranslate;
        public double SetupFee;
        public double PromptFee;
        public double ConversionSetupFee;
        public double ConversionPromptFee;
        public double TranslationFeeMinimum;
        public double TranslationFeePerWord;
        public double TransferFee;
        public double CDFee;
        public string FeeFormula;

        public PromptInformation(string ctg, string lang)
        {
            CTGNumber = ctg;
            Language = lang;
            WaveFormat = false;
            AltFormat = false;
            CDRequired = false;
            TranslationRequired = false;
            CDMailingAddress = "";
            RecordingStudio = "";
            OrderType = "";
            ConvertedFormat = "";
            DeliveryMethod = "";
            RecordingSessions = 0;
            ConversionSessions = 0;
            PromptsToRecord = 0;
            PromptsBilled = 0;
            PromptsProvided = 0;
            PromptsConverted = 0;
            PromptsToTranslate = 0;
            WordsToTranslate = 0;

            SetupFee = 0;
            PromptFee = 0;
            ConversionSetupFee = 0;
            ConversionPromptFee = 0;
            TranslationFeeMinimum = 0;
            TranslationFeePerWord = 0;
            TransferFee = 0;
            CDFee = 0;
            FeeFormula = "";
            // hate to hardcode it... it should be handled from outside somehow
            if (!lang.Equals(BAD_LANGUAGE))
            {
                TranslationRequired = true;
            }

        }

        public PromptInformation(PromptList list)
        {
            CTGNumber = list.Option.Project.project_number;
            Language = list.language;
            WaveFormat = list.wav_format;
            AltFormat = list.alt_format;
            CDRequired = list.cd_required;
            TranslationRequired = list.translation_required;
            CDMailingAddress = list.cd_mailing_address;
            RecordingStudio = list.recording_studio;
            OrderType = list.order_type;
            ConvertedFormat = list.converted_format;
            DeliveryMethod = list.conv_delivery_method;
            RecordingSessions = 0;
            if (list.rec_sessions.HasValue)
            {
                RecordingSessions = list.rec_sessions.Value;
            }
            ConversionSessions = 0;
            if (list.conv_sessions.HasValue)
            {
                ConversionSessions = list.conv_sessions.Value;
            }
            PromptsToRecord = 0; // hmm
            PromptsBilled = 0;
            if (list.prompts_billed.HasValue)
            {
                PromptsBilled = list.prompts_billed.Value;
            }
            PromptsProvided = 0;
            if (list.prompts_provided.HasValue)
            {
                PromptsProvided = list.prompts_provided.Value;
            }
            PromptsConverted = 0;
            if (list.prompts_converted.HasValue)
            {
                PromptsConverted = list.prompts_converted.Value;
            }
            PromptsToTranslate = 0;
            if (list.prompts_translated.HasValue)
            {
                PromptsToTranslate = list.prompts_translated.Value;
            }
            WordsToTranslate = list.words_translated;

            SetupFee = 0;
            if (list.setup_fee.HasValue)
            {
                SetupFee = list.setup_fee.Value;
            }
            PromptFee = 0;
            if (list.prompt_fee.HasValue)
            {
                PromptFee = list.prompt_fee.Value;
            }
            ConversionSetupFee = 0;
            if (list.conversion_setup_fee.HasValue)
            {
                ConversionSetupFee = list.conversion_setup_fee.Value;
            }
            ConversionPromptFee = 0;
            if (list.conversion_prompt_fee.HasValue)
            {
                ConversionPromptFee = list.conversion_prompt_fee.Value;
            }
            TranslationFeeMinimum = 0;
            if (list.translation_fee_minimum.HasValue)
            {
                TranslationFeeMinimum = list.translation_fee_minimum.Value;
            }
            TranslationFeePerWord = 0;
            if (list.translation_fee_word.HasValue)
            {
                TranslationFeePerWord = list.translation_fee_word.Value;
            }
            TransferFee = 0;
            if (list.transfer_fee.HasValue)
            {
                TransferFee = list.transfer_fee.Value;
            }
            CDFee = 0;
            if (list.cd_fee.HasValue)
            {
                CDFee = list.cd_fee.Value;
            }
            FeeFormula = list.fee_formula;
            // hate to hardcode it... it should be handled from outside somehow
            if (!Language.Equals(BAD_LANGUAGE))
            {
                TranslationRequired = true;
            }

        }

        public int getDigitizedPrompts()
        {
            return PromptsToRecord + PromptsProvided;
        }
        /*
        public double getSetupFee()
        {
            if (OrderType.Equals("Standard"))
            {
                if (Language.Equals(BAD_LANGUAGE))
                {
                    return RecordingSessions * 325;
                }
                else
                {
                    return RecordingSessions * 425;
                }
            }
            else if (OrderType.Equals("Next Business Day"))
            {
                if (Language.Equals(BAD_LANGUAGE))
                {
                    return RecordingSessions * 410;
                }
                else
                {
                    return RecordingSessions * 531.26;
                }
            }
            else if (OrderType.Equals("Same Day"))
            {
                if (Language.Equals(BAD_LANGUAGE))
                {
                    return RecordingSessions * 490;
                } 
                else 
                {
                    return RecordingSessions * 637.5;
                }
            }
            return 0;
        }

        public double getPromptFee()
        {
            if (OrderType.Equals("Standard"))
            {
                if (Language.Equals(BAD_LANGUAGE))
                {
                    return PromptsBilled * 6;
                }
                else
                {
                    return PromptsBilled * 10.5;
                }
            }
            else if (OrderType.Equals("Next Business Day"))
            {
                if (Language.Equals(BAD_LANGUAGE))
                {
                    return PromptsBilled * 7.5;
                }
                else
                {
                    return PromptsBilled * 13.25;
                }
            }
            else if (OrderType.Equals("Same Day"))
            {
                if (Language.Equals(BAD_LANGUAGE))
                {
                    return PromptsBilled * 9;
                }
                else
                {
                    return PromptsBilled * 15.75;
                }
            }
            return 0;
        }

        public double getConversionSetupFee()
        {
            return 50 * ConversionSessions;
        }

        public double getConversionPromptFee()
        {
            return 1 * PromptsConverted;
        }

        public double getTransferFee()
        {
            return 20 * (RecordingSessions + ConversionSessions);
        }

        public double getCDFee()
        {
            if (CDRequired)
            {
                return 30.5 * RecordingSessions;
            }
            else
            {
                return 0;
            }
        }

        public double getTranslationMinimum() {
            if(TranslationRequired) {
                if (OrderType.Equals("Standard"))
                {
                    return 150;
                }
                else if (OrderType.Equals("Next Business Day"))
                {
                    return 187.5;
                }
                else if (OrderType.Equals("Same Day"))
                {
                    return 225;
                }
            }
            return 0;
        }

        public double getTranslationPerWord()
        {
            if (TranslationRequired)
            {
                if (OrderType.Equals("Standard"))
                {
                    return 0.38 * WordsToTranslate;
                }
                else if (OrderType.Equals("Next Business Day"))
                {
                    return 0.40 * WordsToTranslate;
                }
                else if (OrderType.Equals("Same Day"))
                {
                    return 0.57 * WordsToTranslate;
                }
            }
            return 0;
        }

        public string getTranslationString()
        {
            if (TranslationRequired)
            {
                if (OrderType.Equals("Standard"))
                {
                    if (150 > 0.38 * WordsToTranslate)
                    {
                        return "$150 (using minimum)";
                    }
                    else
                    {
                        double value = 0.38 * WordsToTranslate;
                        return value.ToString("C") + " ($0.38 x " + WordsToTranslate + " words)";
                    }
                }
                else if (OrderType.Equals("Next Business Day"))
                {
                    if (187.5 > 0.40 * WordsToTranslate)
                    {
                        return "$187.50 (using minimum)";
                    }
                    else
                    {
                        double value = 0.40 * WordsToTranslate;
                        return value.ToString("C") + " ($0.40 x " + WordsToTranslate + " words)";
                    }
                }
                else if (OrderType.Equals("Same Day"))
                {
                    if (225 > 0.57 * WordsToTranslate)
                    {
                        return "$225 (using minimum)";
                    }
                    else
                    {
                        double value = 0.57 * WordsToTranslate;
                        return value.ToString("C") + " ($0.57 x " + WordsToTranslate + " words)";
                    }
                }
            }
            return "N/A";
        }*/
        public string getTranslationString()
        {
            if (TranslationRequired)
            {
                if (TranslationFeeMinimum < TranslationFeePerWord)
                {
                    return TranslationFeePerWord.ToString("C") + " (" + this.WordsToTranslate + " words)";
                }
                else
                {
                    return TranslationFeeMinimum.ToString("C") + " (using minimum)";
                }
            }
            return "N/A";
        }
        public double getTotalFee()
        {
            double translationPrice = Math.Max(this.TranslationFeeMinimum, this.TranslationFeePerWord);
            return this.SetupFee + this.PromptFee + this.ConversionSetupFee + this.ConversionPromptFee + this.TransferFee + this.CDFee + translationPrice;
        }

        public bool isNull()
        {
            if (getTotalFee() > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public int getPromptsToBeDigitized()
        {
            return PromptsProvided + PromptsToRecord;
        }

        public string getSummary()
        {
            double perPromptFee = 0;
            if(this.PromptsBilled > 0) {
                perPromptFee = this.PromptFee / this.PromptsBilled;
            }
            string toReturn = "<b>" + Language + " Total: " + getTotalFee().ToString("C") + "</b><br>" +
                "" + Language + " Setup:  " + this.SetupFee.ToString("C") + "<br>" +
                "" + Language + " Transfer:  " + this.TransferFee.ToString("C") + "<br>" +
                "" + Language + " Prompts: " + this.PromptFee.ToString("C") + " (" + this.PromptsBilled + " x " + perPromptFee.ToString("C") + ")<br>" +
                "" + Language + " CD Creation/mailing:  " + this.CDFee.ToString("C") + "<br>";
            if (this.TranslationRequired)
            {
                toReturn = toReturn + "" + Language + " Translations:  " + getTranslationString() + "<br>";
            }
            toReturn = toReturn + "<br>";
            return toReturn;

        }
    }
}