def getDefaultLoaPoConditions(bid):

    defaultConditions = [
        {
            'name' : 'scopeofwork',
            'displayName' : 'Scope of Work',
            'text' : " The scope of work includes " + bid.bid_subject +
        "as per BOQ in Annexure-I and as per terms & conditions of the contract "
        },
        {
            'name' : 'deliveryperiod',
            'displayName' : 'Delivery Period',
            'text' : ''
        },
        {
            'name' : 'contractperiod',
            'displayName' : 'Contract Period',
            'text' : ''
        },
    ]
    return defaultConditions
