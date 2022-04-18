from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import familymembers,parentallowance, constructionInvestment,constructionPhotos
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from .serializer import myModelSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import generics,status

import json
import uuid
import boto3
S3_BASE_URL = 'https://s3.ca-central-1.amazonaws.com/'
BUCKET = 'madbanklambert'

# Create your views here.

# to perform crud

class familyview(APIView):
    # def get(self,request):
    #     detailed_allowance = parentallowance.objects.all() 
    #     det_serialiseAllowance = myModelSerializer(detailed_allowance,many=True)
    #     return Response(det_serialiseAllowance.data)
    
    def get(self,request):
        cursor = connection.cursor()
        cursor.execute("select * from madbankapp_familymembers f inner join madbankapp_parentallowance p on (f.id = p.fam_member_id)")
        results = cursor.fetchall()
        allowanceObject= []
        columns = [col[0] for col in cursor.description]
        for result in results:
            allowanceObject.append(dict(zip(columns,result)))
        return Response(allowanceObject)

    def post(self,request):
        serialiseObj = myModelSerializer(data=request.data)
        if serialiseObj.is_valid():
          serialiseObj.save()
          return Response(200)
        return Response(serialiseObj.errors)

class familyupdate(APIView):
    def post(self,request,pk):
        try:
            detailAl = parentallowance.objects.get(id=pk)
        except:
            return Response("Not found in database")
        serialiseObj = myModelSerializer(detailAl,data=request.data)
        if serialiseObj.is_valid():
          serialiseObj.save()
          return Response(200)
        return Response(serialiseObj.errors)
        
class familydelete(APIView):
    def post(self,request,pk):
        try:
            detailAl = parentallowance.objects.get(id=pk)
        except:
            return Response("Not found in database")
        detailAl.delete()
        return Response(200)


def family_members(request):
    members = familymembers.objects.all().values()
    member_list = list(members)
    return JsonResponse(member_list, safe=False)

def parent_allowance(request):
    cursor = connection.cursor()
    cursor.execute("select * from madbankapp_familymembers f inner join madbankapp_parentallowance p on (f.id = p.fam_member_id)")
    results = cursor.fetchall()
    allowanceObject= []
    columns = [col[0] for col in cursor.description]
    for result in results:
        allowanceObject.append(dict(zip(columns,result)))
    return JsonResponse(allowanceObject, safe=False)

def fam_investments(request):
    cursor = connection.cursor()
    cursor.execute("select * from madbankapp_constructionproject d inner join madbankapp_constructioninvestment c on (d.id = c.phase_id)inner join madbankapp_familymembers f on (f.id = c.person_id)")
    results = cursor.fetchall()
    inserObject =[]
    columns = [col[0] for col in cursor.description]
    for result in results:
        inserObject.append(dict(zip(columns,result)))
    return JsonResponse(inserObject, safe=False)

class transactions(APIView):
    def get(self,request,pk):
        try:
            allowance = parentallowance.objects.filter(fam_member_id=pk).values()
            constructionmoney = constructionInvestment.objects.filter(person_id=pk).values()
            detaildatarr = []
            constructiondata = list(constructionmoney)
            allowancedata = list(allowance)
            detaildatarr.append(allowancedata)
            detaildatarr.append(constructiondata)
            return JsonResponse(detaildatarr, safe=False)
        except:
            return Response("Not found in database")

@csrf_exempt    
def upload(request):
    # photo-file will be the "name" attribute on the <input type="file">
    photo_file = request.FILES.get('photo-file', None)
    if photo_file:
        s3 = boto3.client('s3')
        # need a unique "key" for S3 / needs image file extension too
        key = uuid.uuid4().hex[:6] + photo_file.name[photo_file.name.rfind('.'):]
        # just in case something goes wrong
        try:
            s3.upload_fileobj(photo_file, BUCKET, key)
            # build the full url string
            url = f"{S3_BASE_URL}{BUCKET}/{key}"
            # we can assign to cat_id or cat (if you have a cat object)
            photo = constructionPhotos(url=url)
            photo.save()
        except:
            print('An error occurred uploading file to S3')
    return redirect('http://localhost:3000/construction')


# @csrf_exempt
# def pay_allowance(request):
#     serializer = myModelSerializer(data = request)
#     if serializer.is_valid():
#            serializer.save()
#     return JsonResponse(serializer.data)
    



# convert tuple to dict - but only returns first value (problem)
# columns = [col[0] for col in cursor.description]
#     for row in cursor.fetchall():
#      finalObj = dict(zip(columns,row))



# class familyview(APIView):
#     def get(self,request):
#         detailed_allowance = parentallowance.objects.all() 
#         det_serialiseAllowance = myModelSerializer(detailed_allowance,many=True)
#         return Response(det_serialiseAllowance.data)