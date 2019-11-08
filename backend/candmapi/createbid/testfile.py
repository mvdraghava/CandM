 ot = OpenTender(
        indentNo = data['tenderDetails']['indentNo'],
        tenderSubject = data['tenderDetails']['tenderSubject'],
        etNo = data['tenderDetails']['etNo'],
        tenderCategory = data['tenderDetails']['tenderCategory'],
        productCategory = data['tenderDetails']['productCategory'],
        proposalRefNo = data['proposalDetails']['proposalRefNo'],
        proposalDate = getDate(data['proposalDetails']['proposalDate']),
        proposalRecievedDate = getDate(data['proposalDetails']['proposalRecievedDate']),
        indentDept = data['proposalDetails']['indentDept'],
        engineerIncharge = data['proposalDetails']['engineerIncharge'],
        addressConsignee = data['proposalDetails']['addressConsignee'],
        estCost = data['amountDetails']['estCost'],
        gstIncl = data['amountDetails']['gstIncl'],
        noteDate = getDate(data['noteDetails']['noteDate']),
        noteBy = data['noteDetails']['noteBy'],
        notebyDesg = data['noteDetails']['notebyDesg'],
    )

data = {
    'tenderDetails': {
        'indentNo': '556', 
        'tenderSubject': 'fdgjdfk', 
        'etNo': '14', 
        'tenderCategory': 'fsd', 
        'productCategory': 'dfs'}, 
    'proposalDetails': {
            'proposalRefNo': 'fsd', 
            'proposalDate': '2019-11-03T18:30:00.000Z', 
            'proposalRecievedDate':'2019-11-05T18:30:00.000Z', 
            'indentDept': 'fsd', 
            'engineerIncharge': 'dfs', 
            'addressConsignee': 'dfs'}, 
    'amountDetails': {
                'estCost': '312560', 
                'gstIncl': True}, 
    'noteDetails': {
                    'noteDate': '2019-11-05T18:30:00.000Z', 
                    'noteBy': 'fsd', 
                    'notebyDesg': 'fds'}
}
