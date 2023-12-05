import { Attributes } from "@/studentData"
import { AgentMessage } from '@aries-framework/core';
import { apiCall } from './BaseUrl'

export async function getCredDefId() {
    try {
        let creddefID = await apiCall.get('/getCredDefId')
        return JSON.parse(JSON.stringify(creddefID.data))
    }
    catch (e) {
        return "id not found"
    }
}

export async function issueCredential(credId: string, condId: string, attributeData: Attributes) {
    try {
        let response: AgentMessage = await apiCall.post(`/credentials/offer-credential`, {
            protocolVersion: "v2",
            credentialFormats: {
                indy: {
                    credentialDefinitionId: credId,
                    attributes: [
                        { name: 'id', value: attributeData.id },
                        { name: 'name', value: attributeData.name },
                        { name: 'course', value: attributeData.course },
                        { name: 'year', value: attributeData.year },
                        { name: 'mark', value: attributeData.mark },
                    ]
                }
            },
            autoAcceptCredential: "always",
            connectionId: condId

        })
        return response
    }
    catch (e) {
        console.log("credential issue failed")
    }
}

export async function issueCredentialOffer(credId: string, attributeData: Attributes) {
    try {

        const response = await apiCall.post(`/credentials/create-offer`, {
            protocolVersion: "v1" || "v2",
            credentialFormats: {
                indy: {
                    credentialDefinitionId: credId,
                    attributes: [
                        { name: 'id', value: attributeData.id },
                        { name: 'name', value: attributeData.name },
                        { name: 'course', value: attributeData.course },
                        { name: 'year', value: attributeData.year },
                        { name: 'mark', value: attributeData.mark },
                    ]
                }
            },
            autoAcceptCredential: "always",
            comment: "some comment",

        })
        return response.data.message
    }
    catch (e) {
        console.log("credential issue failed")
    }
}

export const getCredDetails = async (attrVal: string) => {
    const response = await apiCall.get(`/credAttr?value=${attrVal}`)
    return response
}



