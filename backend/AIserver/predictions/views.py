import boto3
from rest_framework.views import APIView
from django.http import JsonResponse

from predictions.models import Learn
import uuid

from trained_Model.predict import expect

class FileToURL(APIView):
    s3_client = boto3.client(
            's3',
            aws_access_key_id='AKIAVKWXUQLU7OTAGQHZ',
            aws_secret_access_key='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'
        )

    def post(self, request):
        file = request.FILES.get('file')
        file.name = str(uuid.uuid1())
        self.s3_client.upload_fileobj(
            file,
            'ssafy-s3-bucket',
            file.name,
            ExtraArgs={
                "ContentType": file.content_type
            }
        )
            
        file_urls = f"https://s3.ap-northeast-2.amazonaws.com/ssafy-s3-bucket/{file.name}" 
        learn = Learn(picture_url=file_urls)
        learn.save()
        words = expect(file_urls)

        return JsonResponse({'words': words}, status=200)