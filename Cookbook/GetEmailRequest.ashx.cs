using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Globalization;
using System.Net.Mail;

namespace Cookbook
{

    public class GetEmailRequest : DatabaseHandler
    {
        string comments = "Comments: ";
        public override PagedData ProcessRequest(HttpContext context, CookDBDataContext db)
        {
            try
            {
                System.IO.StreamReader reader = new System.IO.StreamReader(context.Request.InputStream, context.Request.ContentEncoding);
                var jsonSerializer = new JsonSerializer();

                string blobParam = context.Request.Params.Get("jsonBlob");
                //JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(reader.ReadToEnd())));
                //ath 11-7-12 since JS is using form.submit now, have to decode JSON object in a different way
                JObject blob = (JObject)jsonSerializer.Deserialize(new JsonTextReader(new StringReader(blobParam)));
                string user_name = context.Request.Params.Get("user_name");
                string template_type = context.Request.Params.Get("template_type");
                string formatted_user_name = extractName(user_name);
                bool is_preview = Convert.ToBoolean(context.Request.Params.Get("is_preview"));
                bool is_template = Convert.ToBoolean(context.Request.Params.Get("is_template"));

                List<string> emailToList = new List<string>();
                List<string> nameToList = new List<string>();
                if (blob["emailTo"] != null)
                {
                    if (blob["emailTo"].Type.ToString().Equals("String"))
                    {
                        if (((string)blob["emailTo"]).Contains(';'))
                        {
                            string[] names = ((string)blob["emailTo"]).Split(';');
                            for (int i = 0; i < names.Count(); i++)
                            {
                                emailToList.Add(names[i]);
                                nameToList.Add(extractName(names[i]));
                            }
                        }
                        else
                        {
                            emailToList.Add((string)blob["emailTo"]);
                            nameToList.Add(extractName((string)blob["emailTo"]));
                        }
                    }
                    else
                    {
                        if ((blob["emailTo"]).Count() != 0)
                        {
                            for (int i = 0; i < ((JArray)blob["emailTo"]).Count; i++)
                            {
                                if (((string)blob["emailTo"][i]).Contains(';'))
                                {
                                    string[] names = ((string)blob["emailTo"][i]).Split(';');
                                    for (int j = 0; j < names.Count(); j++)
                                    {
                                        emailToList.Add(names[j]);
                                        nameToList.Add(extractName(names[j]));
                                    }
                                }
                                else
                                {
                                    emailToList.Add((string)blob["emailTo"][i]);
                                    nameToList.Add(extractName((string)blob["emailTo"][i]));
                                }
                            }
                        }
                    }
                }

                List<string> emailCcList = new List<string>();
                List<string> nameCcList = new List<string>();
                if (blob["emailCc"] != null)
                {
                    if (blob["emailCc"].Type.ToString().Equals("String"))
                    {
                        if (((string)blob["emailCc"]).Contains(';'))
                        {
                            string[] names = ((string)blob["emailCc"]).Split(';');
                            for (int i = 0; i < names.Count(); i++)
                            {
                                emailCcList.Add(names[i]);
                                nameCcList.Add(extractName(names[i]));
                            }
                        }
                        else
                        {
                            emailCcList.Add((string)blob["emailCc"]);
                            nameCcList.Add(extractName((string)blob["emailCc"]));
                        }
                    }
                    else
                    {
                        if ((blob["emailCc"]).Count() != 0)
                        {
                            for (int i = 0; i < ((JArray)blob["emailCc"]).Count; i++)
                            {
                                if (((string)blob["emailCc"][i]).Contains(';'))
                                {
                                    string[] names = ((string)blob["emailCc"][i]).Split(';');
                                    for (int j = 0; j < names.Count(); j++)
                                    {
                                        emailCcList.Add(names[j]);
                                        nameCcList.Add(extractName(names[j]));
                                    }
                                }
                                else
                                {
                                    emailCcList.Add((string)blob["emailCc"][i]);
                                    nameCcList.Add(extractName((string)blob["emailCc"][i]));
                                }
                            }
                        }
                    }
                }


                List<string> emailBccList = new List<string>();
                List<string> nameBccList = new List<string>();
                if (blob["emailBcc"] != null)
                {
                    if (blob["emailBcc"].Type.ToString().Equals("String"))
                    {

                        if (((string)blob["emailBcc"]).Contains(';'))
                        {
                            string[] names = ((string)blob["emailBcc"]).Split(';');
                            for (int i = 0; i < names.Count(); i++)
                            {
                                emailBccList.Add(names[i]);
                                nameBccList.Add(extractName(names[i]));
                            }
                        }
                        else
                        {
                            emailBccList.Add((string)blob["emailBcc"]);
                            nameBccList.Add(extractName((string)blob["emailBcc"]));
                        }
                    }
                    else
                    {
                        if ((blob["emailBcc"]).Count() != 0)
                        {
                            for (int i = 0; i < ((JArray)blob["emailBcc"]).Count; i++)
                            {
                                if (((string)blob["emailBcc"][i]).Contains(';'))
                                {
                                    string[] names = ((string)blob["emailBcc"][i]).Split(';');
                                    for (int j = 0; j < names.Count(); j++)
                                    {
                                        emailBccList.Add(names[j]);
                                        nameBccList.Add(extractName(names[j]));
                                    }
                                }
                                else
                                {
                                    emailBccList.Add((string)blob["emailBcc"][i]);
                                    nameBccList.Add(extractName((string)blob["emailBcc"][i]));
                                }
                            }
                        }
                    }
                }
                
                string emailSubject = "(no subject)";
                if (blob["emailSubject"] != null)
                {
                    emailSubject = (string)blob["emailSubject"];
                }

                string emailBody = "(empty)";
                if (blob["emailBody"] != null)
                {
                    emailBody = (string)blob["emailBody"];
                }

                MailMessage mailMsg = new MailMessage();

                
                //To
                    for (int i = 0; i < emailToList.Count; i++)
                    {
                        try
                        {
                            if (emailToList[i].Equals(""))
                            {
                                break;
                            }
                            mailMsg.To.Add(new MailAddress(emailToList[i], nameToList[i]));
                        }
                        catch (Exception)
                        {
                            //don't add any addresses
                        }
                    }
                
                //Cc
                
                for (int i = 0; i < emailCcList.Count; i++)
                {
                    try
                    {
                        if (emailCcList[i].Equals(""))
                        {
                            break;
                        }
                        mailMsg.CC.Add(new MailAddress(emailCcList[i], nameCcList[i]));
                    }
                    catch (Exception)
                    {
                        //don't add any addresses
                    }
                }

                //Bcc
                for (int i = 0; i < emailBccList.Count; i++)
                {
                    try
                    {
                        if (emailBccList[i].Equals(""))
                        {
                            break;
                        }
                        mailMsg.Bcc.Add(new MailAddress(emailBccList[i], nameBccList[i]));
                    }
                    catch (Exception)
                    {
                        //don't add any addresses
                    }
                }


                //from
                mailMsg.From = new MailAddress(user_name + "@usan.com", formatted_user_name);

                //subject
                mailMsg.Subject = emailSubject;

                //body
                mailMsg.IsBodyHtml = true;
                mailMsg.Body = emailBody;


                //attachments
                byte[] fileContent = default(byte[]);
                string filename = "";
                HttpRequest request = context.Request;
                HttpFileCollection myFileCollection = request.Files;
                string fileType = "";
                int currentAttachmentSize = 0;

                for (int i = 0; i < myFileCollection.Count; i++)
                {
                    if (myFileCollection.Keys[i].ToString().Equals("uploaded_file1"))
                    {
                        int fileLength = myFileCollection[i].ContentLength;
                        fileType = myFileCollection[i].ContentType;
                        if (fileLength > 0)
                        {
                            fileContent = new byte[fileLength];
                            filename = myFileCollection[i].FileName;
                            char[] arr = { '\\', '/' };
                            int filenameStart = filename.LastIndexOfAny(arr);
                            if (filenameStart > 0)
                            {
                                filename = filename.Substring(filenameStart + 1);
                            }
                            myFileCollection[i].InputStream.Read(fileContent, 0, fileLength);

                            if (filename != null && filename != "" && fileType != "" && filename != "")
                            {
                                currentAttachmentSize += myFileCollection[i].ContentLength;
                                var newAttachment = new System.Net.Mail.Attachment(new MemoryStream(fileContent), filename, fileType);
                                mailMsg.Attachments.Add(newAttachment);
                            }
                        }
                        else
                        {
                            //throw new Exception("Uploaded file is empty");
                        }
                    }
                }
                if (fileContent == default(byte[]))
                {
                    //throw new Exception("Uploaded file is missing");
                }


                if (currentAttachmentSize > 20971520) //20 mb
                {
                    throw new Exception("Attachment size is too large. Please keep attachments under 20 MB total.");
                }




                //send the email
                string server = "mail.usani.com";
                SmtpClient smtpClient = new SmtpClient(server);
                smtpClient.Credentials = CredentialCache.DefaultNetworkCredentials;




                if (emailToList.Count > 0)
                {
                    smtpClient.Send(mailMsg);
                }
                else
                {
                    throw new Exception("Error: No recipients identified");
                }


            }
            catch (Exception e)
            {
                comments += "Error: Show this Screen to the Cookbook Admins!! " + e.Message + "|" + e.StackTrace + "|" + e.InnerException;
                throw new Exception(comments);
            }



            return new PagedData("success! "+comments);
        }

        public string extractName(String incName)
        {
            string firstname = "f";
            string lastname = "l";

            if (incName.Contains('@'))
            {
                incName = incName.Substring(0, incName.IndexOf('@'));
                if (incName.Contains('.') == true)
                {
                    firstname = incName.Substring(0, incName.IndexOf('.'));
                    lastname = incName.Substring(incName.IndexOf('.') + 1);

                    firstname = firstname.Trim();
                    lastname = lastname.Trim();

                    firstname = firstname.ToLower();
                    lastname = lastname.ToLower();

                    firstname = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(firstname);
                    lastname = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(lastname);

                    return firstname + " " + lastname;
                }
                else
                {
                    incName = incName.Trim();
                    incName = incName.ToLower();
                    incName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(incName);
                    return incName;
                }
            }
            else
            {
                if (incName.Contains('.') == true)
                {
                    firstname = incName.Substring(0, incName.IndexOf('.'));
                    lastname = incName.Substring(incName.IndexOf('.') + 1);

                    firstname = firstname.Trim();
                    lastname = lastname.Trim();

                    firstname = firstname.ToLower();
                    lastname = lastname.ToLower();

                    firstname = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(firstname);
                    lastname = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(lastname);

                    return firstname + " " + lastname;
                }
                else
                {
                    incName = incName.Trim();
                    incName = incName.ToLower();
                    incName = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(incName);
                    return incName;
                }
            }
            
            
        }
    }
}