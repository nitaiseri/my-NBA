import re

camel_pat = re.compile(r'([A-Z])')
under_pat = re.compile(r'_([a-z])')

def camel_to_underscore(name):
    return camel_pat.sub(lambda x: '_' + x.group(1).lower(), name)

def underscore_to_camel(name):
    return under_pat.sub(lambda x: x.group(1).upper(), name)

def json_under_to_camel(obj):
    keys = list(obj.keys())
    for key in keys:
        obj[underscore_to_camel(key)] = obj.pop(key)
    return obj