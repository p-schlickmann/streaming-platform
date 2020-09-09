from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.response import Response
from django.db.utils import IntegrityError

from .serializers import UserSerializer, AuthTokenSerializer, StreamSerializer, CategorySerializer
from core.models import Stream, Category


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve ONLY authenticated user, not them all"""
        return self.request.user


class StreamList(generics.ListAPIView):
    serializer_class = StreamSerializer
    http_method_names = ("get", "options")
    queryset = Stream.objects.all()

    def get_queryset(self):
        stream = self.request.query_params.get('stream')
        category = self.request.query_params.get('category')
        user = self.request.query_params.get('user')

        if stream:
            queryset = self.queryset.filter(id=stream)
        elif category:
            queryset = self.queryset.filter(category=category)
        elif user:
            queryset = self.queryset.filter(user=user)
        else:
            queryset = self.queryset.all()

        return queryset


class CreateStreamView(generics.CreateAPIView):
    serializer_class = StreamSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ManageStreamView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    serializer_class = StreamSerializer

    def get_object(self):
        try:
            user_stream = Stream.objects.filter(user=self.request.user)[0]
        except IndexError:
            user_stream = None

        return user_stream


class CategoriesView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    http_method_names = ('get',)

    def get_queryset(self):
        name = self.request.query_params.get('name')
        category_id = self.request.query_params.get('id')
        if name:
            queryset = self.queryset.filter(name=name)
        elif category_id:
            queryset = self.queryset.filter(id=category_id)
        else:
            queryset = self.queryset.all()

        return queryset
