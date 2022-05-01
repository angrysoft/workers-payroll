# Generated by Django 4.0.4 on 2022-05-01 21:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('payroll', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('nickname', models.CharField(max_length=50, unique=True, verbose_name='Nickname')),
                ('first_name', models.CharField(max_length=50, verbose_name='Firstname')),
                ('last_name', models.CharField(max_length=50, verbose_name='Lastname')),
                ('email', models.CharField(blank=True, max_length=100, verbose_name='Email')),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('functions', models.ManyToManyField(blank=True, to='payroll.function')),
            ],
            options={
                'unique_together': {('first_name', 'last_name')},
            },
        ),
    ]
